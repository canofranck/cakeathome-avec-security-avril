import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NotificationType } from '../enum/notification-type.enum';
import { AuthenticationService } from '../services/authentication/authentication.service';

import { NotifierService } from 'angular-notifier';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private notifierService: NotifierService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isUserLoggedIn();
  }
  // vérifie si l'utilisateur est connecté
  private isUserLoggedIn(): boolean {
    // si l'utilisateur est connecté
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    // si l'utilisateur n'est pas connecté
    // redirige l'utilisateur vers la page de connexion
    this.notifierService.notify('success', 'Bienvenue sur Cake At Home');
    this.router.navigate(['/login']);

    return false;
  }
}
