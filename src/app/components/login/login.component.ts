import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
// import { NotificationService } from 'src/app/services/notification/notification.service';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');
    } else {
      this.notifierService.notify('success', 'Veuillez vous connecter');
      this.router.navigateByUrl('/login');
    }
  }

  public onLogin(user: User): void {
    this.showLoading = true;

    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<User>) => {
          this.notifierService.notify('success', 'Bienvenue sur Cake At Home');
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token!);
          this.authenticationService.addUserToLocalCache(response.body!);

          let loggedUser: User | null = new User();
          loggedUser = response.body;

          // enregistrer pour avoir accès?
          if (loggedUser?.role == 'ROLE_ADMIN') {

            localStorage.setItem(
              'secretAuth',
              'cakelc8!*)54(im1gt7%@4y0^a8hyc2)v$vie-knhqh5*br3td@$#+cake'
                         );

            this.notifierService.notify(
              'success',
              'Bienvenue sur Cake At Home adminstrateur'
            );
          }
          // Récupération du token depuis le localStorage
          // const token = localStorage.getItem('token');

          // if (token) {
          //   const jwtHelper = new JwtHelperService();
          //   const tokenPayload = jwtHelper.decodeToken(token);
          //   const username = tokenPayload.sub;
          //   const uid = tokenPayload.uid;
          // }

          this.router.navigateByUrl('/home');
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.showLoading = false;
        }
      )
    );
  }
  private sendErrorNotification(
    notificationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notifierService.notify(
        'success',
        'Bienvenue sur Cake At Home adminstrateur'
      );
    } else {
      // this.notificationService.notify(notificationType, 'Une erreur es.');t survenue. Veuillez réessayer
    }
  }

  ngOnDestroy(): void {
    //cleanup logic goes there
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
