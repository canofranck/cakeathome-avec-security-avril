import { NotifierService } from 'angular-notifier';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { delay, Observable } from 'rxjs';



import { UserService } from './app/services/user/user.service';
import { AuthenticationService } from './app/services/authentication/authentication.service';
import { NotificationType } from './app/enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate{



  constructor(private userService: UserService, private authenticationService: AuthenticationService, private notifierService: NotifierService, private router: Router) {}



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(localStorage.getItem('secretAuth') == "cakelc8!*)54(im1gt7%@4y0^a8hyc2)v$vie-knhqh5*br3td@$#+cake"){
        return true
      } else{
        this.router.navigate(['/contact']);
      this.notifierService.notify(NotificationType.ERROR, "Cette page est réservée aux admins");
      this.notifierService.notify(NotificationType.INFO, "Si tu veux me contacter, tu peux m'envoyer un message");

        return false
      }










  }

}
