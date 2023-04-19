import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public host = environment.apiUrl; // Url de l'API définie dans la configuration de l'environnement
  private declare token: string;    // Déclaration du jeton d'authentification
  private declare loggedInUsername: string; // Déclaration du nom d'utilisateur connecté
  private jwtHelper = new JwtHelperService(); // Initialisation de l'objet d'aide JWT
  private declare tok: string; // Déclaration d'une variable de jeton supplémentaire


  constructor(private http: HttpClient) {

  }

  public login(user: User): Observable<HttpResponse<User>> {
    // Méthode de connexion pour un utilisateur
    return this.http.post<User>(`${this.host}/user/login`, user, {
      observe: 'response',
    });
  }

  public register(user: User): Observable<User> {
    // Méthode d'inscription pour un utilisateur
    return this.http.post<User>(`${this.host}/user/register`, user);
  }

  public logOut(): void {   // Méthode de déconnexion de l'utilisateur
    this.token = ''; // Effacer le jeton
    this.loggedInUsername = ''; // Effacer le nom d'utilisateur connecté
    this.tok = '';  // Effacer le jeton supplémentaire
    localStorage.removeItem('token');  // Effacer le jeton du stockage local
    localStorage.removeItem('secretAuth');// Effacer une clé de stockage supplémentaire
  }

  public saveToken(token: string): void {   // Méthode pour enregistrer le jeton dans le stockage local
    this.token = token;
    localStorage.setItem('token', token); // Stocker le jeton dans le stockage local
  }

  public addUserToLocalCache(user: User): void {

     // Récupérer l'utilisateur stocké dans le stockage local sous forme de chaîne JSON et le convertir en objet User
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
      // Méthode pour récupérer l'utilisateur du cache local

    return JSON.parse(localStorage.getItem('user')!); /* || '{}' */
  }

  /* Récupère le token  dans le local storage */
  public loadToken(): void {
    this.token != localStorage.getItem('token'); /* || '{}' */
  }

  /* Récupère le TOKEN de la méthode loadToken() pour pouvoir l'utiliser */
  public getToken(): string {
    return this.token;
  }

  /* Vérifie si l'utilisateur est connecté  */
  public isUserLoggedIn(): boolean {
 // Récupère le token stocké dans l'objet AuthenticationService
    const tok = this.token;

// Vérifie si le token est valide et non nul
    if (tok != null && tok !== '') {
       // Vérifie si le token est décodable et contient une clé 'sub'
      if (this.jwtHelper.decodeToken(tok).sub != null || '') {
          // Vérifie si le token n'a pas expiré
        if (!this.jwtHelper.isTokenExpired(tok)) {
         // Stocke le nom d'utilisateur dans loggedInUsername en le décodant à partir du token
          this.loggedInUsername = this.jwtHelper.decodeToken(tok).sub;
          console.log(
            'Résultat this.loogedInUSername (decoded token) : [ ' +
              this.loggedInUsername +
              ' ] Authentication > isLoggedIn()'
          );
           // Retourne true si l'utilisateur est connecté
          return true;
        }
      }
    } else {
       // Si le token est invalide ou nul, appelle la méthode logOut() et retourne false
      this.logOut();
      return false;
    }
    return false;
  }
}
