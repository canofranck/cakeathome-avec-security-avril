import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/app/enum/header-type.enum';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/models/user/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public showLoading: boolean = false;
  private subscriptions: Subscription [] = [];

  constructor(private router: Router,
     private authenticationService: AuthenticationService,
     private notifierService: NotifierService) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
      console.log("Ca fonctionne login");
    }


  }



  public onRegister(user: User): void{
    this.showLoading = true;
    console.log(user);

    this.subscriptions.push(this.authenticationService.register(user).subscribe(
      (response: User)=>  {

        console.log("Je suis dans Register", response.firstname);

        this.showLoading = false;
        this.notifierService.notify('success', `Votre compte a bien été crée ${response.username}`);
        // this.sendNotification(NotificationType.SUCCESS, `Votre compte a bien été crée ${response.username}`);
        this.router.navigateByUrl('/login');
      },
      (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
      }
      )
    )

  }
  private sendNotification(notificationType: NotificationType, message: string) {
    if(message){
      // this.notificationService.notify(notificationType, message);
    } else {
      // this.notificationService.notify(notificationType, 'Une erreur est survenue. Veuillez réessayer.');
    }
  }

  ngOnDestroy(): void {
    //cleanup logic goes there
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}




