import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menu!: HTMLElement | null;

  constructor() {}

  ngOnInit(): void {
    const menu = document.querySelector('.mob-menu');

  }
  isMenuOpen = false;

  toggleMobileMenu() {
    const menuContainer = document.querySelector('.menu-container');
    if (this.isMenuOpen) {
      if(menuContainer) {
      menuContainer.classList.remove('nav-vertical');}
    } else {
      if(menuContainer) {
      menuContainer.classList.add('nav-vertical');}
    }
    this.isMenuOpen = !this.isMenuOpen;
  }
}
