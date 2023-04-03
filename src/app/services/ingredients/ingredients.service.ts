import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ingredients } from 'src/app/models/ingredients/ingredients';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  httpOptions={
    headers : new HttpHeaders({'content-Type': 'application/json'})
  }
  constructor(private http:HttpClient) {}
  findAllIngredients(){
    return this.http.get(AppSettings.APP_URL+"/ingredient");
  }
  saveIngredient (ingredient:Ingredients){
    return this.http.post(AppSettings.APP_URL+"/ingredient",JSON.stringify(ingredient),this.httpOptions);
  }

  editIngredient(id:number){
    return this.http.get(AppSettings.APP_URL+"/ingredient/"+id)
   }

   updateIngredient(ingredient:Ingredients){
    return this.http.put(AppSettings.APP_URL+"/ingredients/"+ingredient.id_ingredient,JSON.stringify(ingredient),this.httpOptions);
   }

   deleteIngredient(id:number){
    return this.http.delete(AppSettings.APP_URL+"/ingredients/"+id);
   }

  }
