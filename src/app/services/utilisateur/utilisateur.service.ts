import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Utilisateur } from "src/app/models/utilisateur/utilsateur";
import { AppSettings } from "src/app/settings/app.settings";

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  }
  constructor(private http:HttpClient) {
  }
  findAllUsers(){
    return this.http.get(AppSettings.APP_URL + '/utilisateur');
  }
  saveUser(utilisateur:Utilisateur){

    return this.http.post(AppSettings.APP_URL + '/utilisateur',JSON.stringify(utilisateur),this.httpOptions);
  }
   editUser(id : number){
    return this.http.get(AppSettings.APP_URL + '/utilisateur/'+id);
   }
  updateUser(utilisateur:Utilisateur){

    return this.http.put(AppSettings.APP_URL + '/utilisateurs/'+utilisateur.id_utilisateur,JSON.stringify(utilisateur),this.httpOptions);
  }
  deleteUser(id:number){
    return this.http.delete(AppSettings.APP_URL + '/utilisateurs/'+id);
  }

}

