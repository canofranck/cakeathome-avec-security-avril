import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent implements OnInit{
  declare utilisateur: any;

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router,
    private route: ActivatedRoute
    )
     {}

  ngOnInit(): void {

    this.utilisateurService.findAllUsers().subscribe(
      data => {
        console.log(data);
        this.utilisateur= data;

      }
    )
    if (this.route.snapshot.paramMap.get('id') != null) {

      this.remove();
    }
  }
  remove() {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.utilisateurService.deleteUser(id).subscribe(
      () => {

      }
    )
  }
}
