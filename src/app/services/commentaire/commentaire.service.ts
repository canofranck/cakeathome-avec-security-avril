import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Commentaire } from 'src/app/models/commentaire/commentaire';

import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {


  httpOptions = {
    headers : new HttpHeaders({'Content-Type':'application/json'})
  }
  constructor(private http:HttpClient) {
  }
  findAllCommentaire(){
    return this.http.get(AppSettings.APP_URL + '/commentaire');

  }
  saveCommentaire(commentaire:Commentaire){

    return this.http.post(AppSettings.APP_URL + '/commentaire',JSON.stringify(commentaire),this.httpOptions);
  }
   editCommentaire(id : number){
    return this.http.get(AppSettings.APP_URL + '/commentaire/'+id);
   }
  updateCommentaire(commentaire:Commentaire){

    return this.http.put(AppSettings.APP_URL + '/commentaires/'+commentaire.id_commentaire,JSON.stringify(commentaire),this.httpOptions);
  }
  deleteCommentaire(id:number){
    return this.http.delete(AppSettings.APP_URL + '/commentaires/'+id);
  }



  



}
