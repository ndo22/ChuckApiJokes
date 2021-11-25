import { Component } from '@angular/core';
import {ChuckjokesService} from '../api/chuckjokes.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myoutput:String = 'Joke will apperar after click on button';
  loadingDialog: any;

constructor(private chuckService: ChuckjokesService, public loadingController: LoadingController) 
{

}

public btnClicked():void
{
  this.presentLoading();
  this.chuckService.getRandom().subscribe( (data) => 
    {
      var text = data['value']['joke'];
      text.toString();
      if(text.includes('&quot;'))
      {
        this.myoutput = text.replaceAll('&quot;', '\"');
      }
      else
      {
        this.myoutput = text;
      }
      this.loadingDialog.dismiss();
    });
  }


async presentLoading() 
{
  this.loadingDialog = await this.loadingController.create(
  {
    message: 'Thinking ...', 
  });
await this.loadingDialog.present();
}


}

