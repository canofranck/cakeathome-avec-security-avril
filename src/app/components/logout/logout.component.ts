import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private notifierService: NotifierService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.notifierService.notify(
      NotificationType.SUCCESS,
      'Tu es bien deconnectée'
    );
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }
}
