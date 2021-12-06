import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ChuckjokesService } from '../api/chuckjokes.service';
import { Clipboard } from '@capacitor/clipboard';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  myoutput: String = 'Joke will apperar after click on button';
  myname: String = '';
  mylastname: String = '';
  loadingDialog: any;

  constructor(private chuckService: ChuckjokesService, public loadingController: LoadingController, public toastController: ToastController) {}

  public btnClicked(): void {
    this.presentLoading();
    this.chuckService.getPersonal(this.myname, this.mylastname).subscribe((data) => {
      var text = data['value']['joke'];
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

const writeToClipboard = async (favourite: string) => {
  await Clipboard.write({
    string: favourite
  });
};
