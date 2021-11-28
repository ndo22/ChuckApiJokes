import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChuckjokesService {

  constructor(private http: HttpClient) { }


  public getRandom() 
  {
    return this.http.get('http://api.icndb.com/jokes/random');
  }

  public getPersonal(name, surname) 
  {
    return this.http.get('http://api.icndb.com/jokes/random?firstName='+name+'&lastName='+surname);
  }

}
