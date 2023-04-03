import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Abonnement } from 'src/app/models/abonnement/abonnement';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {
  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  }
  constructor(private http:HttpClient) {
  }
  findAllUsers(){
    return this.http.get(AppSettings.APP_URL + '/abonnement');
  }
  saveUser(abonnement:Abonnement){

    return this.http.post(AppSettings.APP_URL + '/abonnement',JSON.stringify(abonnement),this.httpOptions);
  }
   editUser(id : number){
    return this.http.get(AppSettings.APP_URL + '/abonnement/'+id);
   }
  updateUser(abonnement:Abonnement){

    return this.http.put(AppSettings.APP_URL + '/abonnements/'+abonnement.id_abonnement,JSON.stringify(abonnement),this.httpOptions);
  }
  deleteUser(id:number){
    return this.http.delete(AppSettings.APP_URL + '/abonnements/'+id);
  }
}

