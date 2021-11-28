import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ChuckjokesService } from '../api/chuckjokes.service';

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

  constructor(private chuckService: ChuckjokesService, public loadingController: LoadingController) {

  }

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

}


