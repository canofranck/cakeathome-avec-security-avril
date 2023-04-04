import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs/internal/Observable";
import { Recette } from "src/app/models/recette/recette";
import { AppSettings } from "src/app/settings/app.settings";


// @Injectable({providedIn: 'root'})
@Injectable({
  providedIn: 'root'
})
export class RecetteService {
  httpOptions={
    headers : new HttpHeaders({'content-Type': 'application/json'})
  }
  idrecetteencours!: number;
  username: String='';


  constructor(private http:HttpClient) {}
  findAllRecettes(){
    return this.http.get(AppSettings.APP_URL+"/recette");
  }
  saveRecette (recette:Recette){
    return this.http.post(AppSettings.APP_URL+"/recette",JSON.stringify(recette),this.httpOptions);
  }

  editRecette(idrecette:number){
    return this.http.get(AppSettings.APP_URL+"/recette/"+idrecette)
   }

   updateRecette(recette:Recette){
    // console.log(this.http.put(AppSettings.APP_URL+"/recettes/"+recette.idrecette,JSON.stringify(recette),this.httpOptions))
    return this.http.put(AppSettings.APP_URL+"/recettes/"+recette.idrecette,JSON.stringify(recette),this.httpOptions);
   }

   deleteRecette(id:number){
    return this.http.delete(AppSettings.APP_URL+"/recettes/"+id);
   }
   addIngredientToRecette(recetteId: number, ingredientId: number): Observable<any> {
    return this.http.post<any>(AppSettings.APP_URL + '/recettes/' + recetteId + '/ingredients/' + ingredientId, {});
  }
  getIdRecetteEncours() {
    console.log("get id recette"+this.idrecetteencours );
    return this.idrecetteencours;
  }

  setIdRecetteEncours(idRecette: number) {

    this.idrecetteencours = idRecette;

    console.log("set idrecette"+this.idrecetteencours )
  }
  updateRecette2(recette:Recette,id :number){
    // console.log(this.http.put(AppSettings.APP_URL+"/recettes/"+recette.idrecette,JSON.stringify(recette),this.httpOptions))
    return this.http.put(AppSettings.APP_URL+"/recettes/"+id,JSON.stringify(recette),this.httpOptions);
   }

   gettoken(){
    // Récupération du token depuis le localStorage
 const token = localStorage.getItem('token');

if (token) {
  const jwtHelper = new JwtHelperService();
  const tokenPayload = jwtHelper.decodeToken(token);
  const username = tokenPayload.sub;
  const uid =tokenPayload.uid
  console.log(" ici le pseudo du token  " +username);
  console.log(" ici l id utilisateur du token  " +uid);
  this.username=username

}
   }
  }
