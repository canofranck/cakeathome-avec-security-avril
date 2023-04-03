import { Utilisateur } from 'src/app/models/utilisateur/utilsateur';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Abonnement } from 'src/app/models/abonnement/abonnement';
import { AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-add-abonnement',
  templateUrl: './add-abonnement.component.html',
  styleUrls: ['./add-abonnement.component.css']
})
export class AddAbonnementComponent implements OnInit{
  declare formAddAbonnement : FormGroup;
  declare abonnement : Abonnement;

  constructor(
    private abonnementService :AbonnementService,
    private utilisateurService:UtilisateurService,
    private userService:UserService,
    private router : Router,
    private formBuilder:FormBuilder,
  ){

  }
 ngOnInit(): void {
    this.formAddAbonnement= this.formBuilder.group({
      id_abonnement: ['',Validators.required],
      uid: [''],
      abonnementpris: ['',Validators.required],
      abonnementdatedebut: ['',Validators.required],
      abonnementduree :['',Validators.required],


    })
}
create(){
  this.utilisateurService.editUser(this.formAddAbonnement.value.uid).subscribe(
    (utilisateur) => {
      if(utilisateur) {
        this.formAddAbonnement.value.utilisateur = utilisateur;
        console.log(utilisateur)
        console.log(this.formAddAbonnement.value.utilisateur)
        this.abonnementService.saveUser(this.formAddAbonnement.value).subscribe(
          () => {
            this.router.navigate(['/abonnement'])
          },
          (error) => {
            console.error(error);
            // Afficher un message d'erreur à l'utilisateur
          }
        )
      } else

      {
        console.error("L'édition de l abonnement a échoué");
        // Afficher un message d'erreur à l'utilisateur
      }
    },
    (error) => {
      console.error(error);
      // Afficher un message d'erreur à l'utilisateur
    }
  );
}
}
