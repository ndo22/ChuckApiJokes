import { Component } from '@angular/core';
import { KeyboardStyle } from '@capacitor/keyboard';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  favourites = ["You dont have any favourite joke right now"];
  keys : string[];

  constructor() {
   // this.loadFav();
    //setName();
  }


  async loadFav() {   
    
    //checkName(this.keys, this.favourites);

    await Storage.keys().then(result => {
      this.keys = result.keys;
      // rest of script
    });

    alert(`Hello ${this.keys[1]}!`);

    for (let index = 0; index < this.keys.length; index++) {
      const { value } = await Storage.get({ key: this.keys[index] });
      alert(`Hello ${value}!`);
      this.favourites[index] = value;
    }
  }

}

const setName = async () => {
  await Storage.set({
    key: 'name',
    value: 'Max',
  });
};

const checkName = async (keys : string[], favourites : string[]) => {
  alert(`clicked!`);

  await Storage.keys().then(result => {
    keys = result.keys;
    // rest of script
  });

  alert(`Hello ${keys[1]}!`);

  for (let index = 0; index < keys.length; index++) {
    const { value } = await Storage.get({ key: keys[index] });
    alert(`Hello ${value}!`);
    favourites[index] = value;
  }


  //const { value } = await Storage.get({ key: 'name' });

  //alert(`Hello ${value}!`);
};

const removeName = async () => {
  await Storage.remove({ key: 'name' });
};
