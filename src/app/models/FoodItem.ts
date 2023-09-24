import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodItem {

    weight : number;
    name : string;
    priceForWhole : number;

    constructor(name : string, weight : number, priceForWhole : number) 
    {
    this.name = name;
    this.weight = weight;
    this.priceForWhole = priceForWhole;
    }


    private GetPriceForOneUnit() : number 
    {
        return this.priceForWhole/this.weight;
    }

    public GetPriceForAmount(amount : number) : number
    {
        return this.GetPriceForOneUnit() * amount;
    }
}