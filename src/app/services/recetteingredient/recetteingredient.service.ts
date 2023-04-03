import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recetteingredient } from 'src/app/models/recetteingredient/recetteingredient';
import { Utilisateur } from 'src/app/models/utilisateur/utilsateur';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class RecetteingredientService {
  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  }
  constructor(private http:HttpClient) {
  }
  findAllRecetteIngredients(){
    return this.http.get(AppSettings.APP_URL + '/recetteingredients');
  }
  saveRecetteIngredients(recetteingredients:Recetteingredient){

    return this.http.post(AppSettings.APP_URL + '/recetteingredients',JSON.stringify(recetteingredients),this.httpOptions);
  }
   editRecetteIngredients(id : number){
    return this.http.get(AppSettings.APP_URL + '/recetteingredients/'+id);
   }
  updateRecetteIngredients(recetteingredients:Recetteingredient){

    return this.http.put(AppSettings.APP_URL + '/recetteingredients/'+recetteingredients.id_recetteingredients,JSON.stringify(recetteingredients),this.httpOptions);
  }
  deleteRecetteIngredients(id:number){
    return this.http.delete(AppSettings.APP_URL + '/recetteingredients/'+id);
  }

}

