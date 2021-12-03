import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favourites: [id: string, joke: string] = ["O","You dont have any favourite joke right now"];
  keys: string[];

  constructor() {

  }

  async loadFav() {
    checkName(this.keys, this.favourites);
  }
  async removeFav(item: string){
    removeName(item)
  }
}

const checkName = async (keys: string[], favourites: string[]) => {
  await Storage.keys().then(result => {
    keys = result.keys;

  });

  for (let index = 0; index < keys.length; index++) {
    const { value } = await Storage.get({ key: keys[index] });
    favourites[index] = value;
  }
};

const removeName = async (id: string) => {
  await Storage.remove({ key: id });
};
