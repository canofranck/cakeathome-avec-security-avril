import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gallerie } from 'src/app/models/gallerie/gallerie';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class GallerieService {


  httpOptions = {
    headers : new HttpHeaders ({'Content-Type' :'application/json'})
  }

  constructor(private http:HttpClient) { }

  findAllGalleries(){
    return this.http.get(AppSettings.APP_URL+'/galleries')
  }

  saveGallerie(gallerie:Gallerie){
    return this.http.post(AppSettings.APP_URL+'/galleries', JSON.stringify(gallerie),this.httpOptions);

  }

  editGallerie(id:number) {
    return this.http.get(AppSettings.APP_URL+'/galleries/'+id)

  }

  updateGallerie(gallerie:Gallerie){
    return this.http.put(AppSettings.APP_URL+'/galleries/'+ gallerie.gallerie_id, JSON.stringify(gallerie),this.httpOptions);
  }

  deleteGallerie(id : number){
    return this.http.delete(AppSettings.APP_URL+'/galleries/'+id)

  }
  findGallerieByName(name : string  ) {
    return this.http.get(AppSettings.APP_URL+'/galleries/nom/'+name)
  }
}
