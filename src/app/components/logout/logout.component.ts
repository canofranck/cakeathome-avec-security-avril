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
    this.notifierService.notify('success', 'Veuillez vous etes déconnecter');

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('users');
    localStorage.removeItem('secretAuth');
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }
}
