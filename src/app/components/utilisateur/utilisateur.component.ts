import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { Utilisateur } from 'src/app/models/utilisateur/utilsateur';

import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements  OnInit {
  declare utilisateur: any[];
  declare form : FormGroup;

  constructor(
    private utilisateurService: UtilisateurService,
    private router : Router,
    private route: ActivatedRoute,

    )
     {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    return this.utilisateurService.findAllUsers().subscribe(
      data => {
        console.log(data);
        this.utilisateur = data as any[];
      }
    )
  }

  // deleteUser(id: number) {

  //   this.utilisateurService.deleteUser(id).subscribe
  //     (
  //       () => {
  //         this.router.navigate(['/utilisateur'])
  //       }
  //     )


  // }
}
