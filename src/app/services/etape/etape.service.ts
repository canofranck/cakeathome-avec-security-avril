import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etape } from 'src/app/models/etape/etape';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class EtapeService {
  httpOptions={
    headers : new HttpHeaders({'content-Type': 'application/json'})
  }
  constructor(private http:HttpClient) {}
  findAllEtapes(){
    return this.http.get(AppSettings.APP_URL+"/etape");
  }
  saveEtape (etape:Etape){
    return this.http.post(AppSettings.APP_URL+"/etape",JSON.stringify(etape),this.httpOptions);
  }

  editEtape(id_etape:number){
    return this.http.get(AppSettings.APP_URL+"/etape/"+id_etape)
   }

   updateEtape(etape:Etape){
    return this.http.put(AppSettings.APP_URL+"/etapes/"+etape.id_recette,JSON.stringify(etape),this.httpOptions);
   }

   deleteEtape(id:number){
    return this.http.delete(AppSettings.APP_URL+"/etapes/"+id);
   }

  }
