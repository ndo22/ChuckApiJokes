import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favourites: { id: string, joke: string }[] = [{ "id": "0", "joke": "There are not any favourite jokes at the time" }];
  keys: string[];

  constructor(public toastController: ToastController) {
    this.loadFav()
  }

  async doRefresh(event) {
    await this.loadFav();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  async loadFav() {
    checkName(this.keys, this.favourites);
  }

  async removeFav(item: { id: string, joke: string }) {
    const index = this.favourites.indexOf(item, 0);
    if (index > -1) {
      this.favourites.splice(index, 1);
    }

    removeName(item.id)

    if (this.favourites.length == 0) {
      this.favourites[0] = { "id": "0", "joke": "There are not any favourite jokes at the time" };
    }
  }

  async copyToClipboard(item: { id: string, joke: string }){
    await writeToClipboard(item.joke.toString());
    this.toasting();
  }

  async toasting() {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Copied to Clipboard'
    });
    
    await toast.present();
  }

}

const checkName = async (keys: string[], favourites: { id: string, joke: string }[]) => {
  await Storage.keys().then(result => {
    keys = result.keys;

  });

  for (let index = 0; index < keys.length; index++) {
    const { value } = await Storage.get({ key: keys[index] });
    favourites[index] = { "id": keys[index].toString(), "joke": value };
  }
};

const removeName = async (id: string) => {
  await Storage.remove({ key: id });
};

const writeToClipboard = async (favourite: string) => {
  await Clipboard.write({
    string: favourite
  });
};