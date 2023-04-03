
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileDetails } from 'src/app/models/fileDetails/filedetails';
import { AppSettings } from 'src/app/settings/app.settings';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {
  // chemin de stockage des images
  private baseUrl = "http://localhost:8085"

  httpOptions = {
    headers : new HttpHeaders ({'Content-Type' :'application/json'})
  }

  constructor(private http: HttpClient) { }

  // fonctions pour envoyer les donnees de l image dans la BD
  upload(file: File) {

    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(AppSettings.APP_URL+'/galleries', JSON.stringify(file),this.httpOptions);
  }


// fonction pour envoyer l image dans le serveur backend
// Observable  s abonne à la source et les envoi des que le fichier est dispo
  upload2(file: File): Observable<FileDetails> {

    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<FileDetails>(`${this.baseUrl}/simple-form-upload-mvc`, formData);
  }
}
