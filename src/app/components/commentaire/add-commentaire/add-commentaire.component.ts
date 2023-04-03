import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commentaire } from 'src/app/models/commentaire/commentaire';
import { Utilisateur } from 'src/app/models/utilisateur/utilsateur';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';
import { RecetteService } from 'src/app/services/recette/recette.service';
import { UtilisateurService } from 'src/app/services/utilisateur/utilisateur.service';

@Component({
  selector: 'app-add-commentaire',
  templateUrl: './add-commentaire.component.html',
  styleUrls: ['./add-commentaire.component.css']
})
export class AddCommentaireComponent implements OnInit{
  declare formAddCommentaire : FormGroup;
   declare commentaire : Commentaire;

  constructor(
    private commentaireService :CommentaireService,
    private utilisateurService:UtilisateurService,
    private recetteService:RecetteService,
    private router : Router,
    private formBuilder:FormBuilder,
  ){

  }
 ngOnInit(): void {
    this.formAddCommentaire= this.formBuilder.group({
      id_commentaire: ['',Validators.required],
      commentaire: ['',Validators.required],
      imagecommentaire: ['',Validators.required],
      notecommentaire: ['',Validators.required],
      datecommentaire :['',Validators.required],
      uid: ['',Validators.required],
      id_recette: ['',Validators.required],
    })
}
create(){

  // mehtode create avec manytoone depuis commentaire
  this.utilisateurService.editUser(this.formAddCommentaire.value.uid).subscribe(
    (utilisateur) => {
      this.recetteService.editRecette(this.formAddCommentaire.value.id_recette).subscribe(
        (recette) => {
          if(utilisateur && recette) {

               this.formAddCommentaire.value.utilisateur =utilisateur;
               this.formAddCommentaire.value.recette=recette;
            };

            this.commentaireService.saveCommentaire(this.formAddCommentaire.value).subscribe(
              () => {
                this.router.navigate(['/commentaire'])
              },
              (error) => {
                console.error("Erreur lors de l'envoi des données au service UtilisateurService");
                // Afficher un message d'erreur à l'utilisateur
              }
            )

          }

      );
    },
    (error) => {
      console.error("Erreur lors de l'envoi des données au service RecetteService");
      // Afficher un message d'erreur à l'utilisateur
    }
  );
}
}
