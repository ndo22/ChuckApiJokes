import { Component } from '@angular/core';
import { ChuckjokesService } from '../api/chuckjokes.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myoutput: string = 'Joke will apperar after click on button';
  myid: string = "";
  loadingDialog: any;

  constructor(private chuckService: ChuckjokesService, public loadingController: LoadingController) {

  }

  public async btnFavClicked(): Promise<void> {

    if (this.myid != "" || this.myoutput != 'Joke will apperar after click on button') {
      try {
        alert(this.myid);
        alert(this.myoutput);
        await Storage.set({
          key: this.myid,
          value: this.myoutput
        });
        alert(`Added To Favourites`);
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


}

