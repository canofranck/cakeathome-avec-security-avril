import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menu!: HTMLElement | null;
  uid: number = 0;
  username: string = '';
  constructor() {}

  ngOnInit(): void {
    const menu = document.querySelector('.mob-menu');
    const token = localStorage.getItem('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      const tokenPayload = jwtHelper.decodeToken(token);
      const username = tokenPayload.sub;
      const uid = tokenPayload.uid;
      this.uid = uid;
      this.username = username;
    }
  }
  isMenuOpen = false;

  toggleMobileMenu() {
    const menuContainer = document.querySelector('.menu-container');
    if (this.isMenuOpen) {
      if (menuContainer) {
        menuContainer.classList.remove('nav-vertical');
      }
    } else {
      if (menuContainer) {
        menuContainer.classList.add('nav-vertical');
      }
    }
    this.isMenuOpen = !this.isMenuOpen;
  }
}
