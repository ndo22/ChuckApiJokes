import { Injectable } from '@angular/core';
import { FoodItem } from './FoodItem';

@Injectable({
  providedIn: 'root'
})
export class Recipe {

    name : string;
    description : string;
    priceForWhole : number;
    list : Array<FoodItem>;

    constructor(name : string, weight : number, priceForWhole : number, description : string) 
    {
        this.name = name;
        this.priceForWhole = priceForWhole;
        this.description = description;
    }

    public AddFoodItemToRecipe(item : FoodItem, amount : number)
    {
        let newItem = new FoodItem(item.name, amount, item.GetPriceForAmount(amount));
        this.list.push(newItem);
    }


    public GetPriceOfRecipe() : number
    {
        let totalPrice = 0;

        this.list.forEach(element => {
            totalPrice += element.priceForWhole;
        });

        return totalPrice;
    }
}