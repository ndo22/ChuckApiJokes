import { Component } from '@angular/core';
import { ChuckjokesService } from '../api/chuckjokes.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myoutput: string = 'Joke will apperar after click on button';
  myid: string = "";
  loadingDialog: any;

  constructor(private chuckService: ChuckjokesService, public loadingController: LoadingController, public toastController: ToastController) {

  }

  async doRefresh(event) {
    await this.btnClicked();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  public async btnFavClicked(): Promise<void> {
    if (this.myid != "" || this.myoutput != 'Joke will apperar after click on button') {
      try {
        await setFav(this.myid, this.myoutput);
        alert(`Added To Favourites`);
        this.btnClicked();
      } catch (reason) {
        alert(reason);
        console.log(reason);
      }
    }
  }

  public btnClicked(): void {
    this.presentLoading();
    this.chuckService.getRandom().subscribe((data) => {
      var text = data['value']['joke'];
      this.myid = data['value']['id'];
      text.toString();
      if (text.includes('&quot;')) {
        this.myoutput = text.replaceAll('&quot;', '\"');
      }
      else {
        this.myoutput = text;
      }
      this.loadingDialog.dismiss();
    });
  }

  async presentLoading() {
    this.loadingDialog = await this.loadingController.create(
      {
        message: 'Thinking ...',
      });
    await this.loadingDialog.present();
  }

  async copyToClipboard(favourite: string){
    await writeToClipboard(favourite);
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

const setFav = async (id: string, favourite: string) => {

  await Storage.set({
    key: id.toString(),
    value: favourite,
  });
};

const writeToClipboard = async (favourite: string) => {
  await Clipboard.write({
    string: favourite
  });
};