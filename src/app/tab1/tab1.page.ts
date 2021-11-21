import { Component } from '@angular/core';
import {ChuckjokesService} from '../api/chuckjokes.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myoutput:String = '';
  loadingDialog: any;

constructor(private chuckService: ChuckjokesService, public loadingController: LoadingController) 
{

}

public btnClicked():void
{
  this.chuckService.getRandom().subscribe( (data) => 
    {
      this.myoutput=data['value']['joke'];
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

