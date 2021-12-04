import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favourites: { id: string, joke: string }[] = [{ "id": "0", "joke": "There are not any favourite jokes at the time" }];
  keys: string[];

  constructor() {
    this.loadFav()
  }

  async doRefresh(event) {
    await this.loadFav();
    event.target.complete();
  }

  async loadFav() {
    checkName(this.keys, this.favourites);
  }
  async removeFav(item: { id: string, joke: string }) {
    alert(item.id)

    const index = this.favourites.indexOf(item, 0);
    if (index > -1) {
      this.favourites.splice(index, 1);
    }

    removeName(item.id)

    if (this.favourites.length == 0) {
      this.favourites[0] = { "id": "0", "joke": "There are not any favourite jokes at the time" };
    }
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
