import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commentaire } from 'src/app/models/commentaire/commentaire';

import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-add-commentaire',
  templateUrl: './add-commentaire.component.html',
  styleUrls: ['./add-commentaire.component.css'],
})
export class AddCommentaireComponent implements OnInit {
  declare formAddCommentaire: FormGroup;
  declare commentaire: Commentaire;

  constructor(
    private commentaireService: CommentaireService,

    private recetteService: RecetteService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.formAddCommentaire = this.formBuilder.group({
      idcommentaire: ['', Validators.required],
      commentaire: ['', Validators.required],
      // imagecommentaire: ['',Validators.required],
      notecommentaire: ['', Validators.required],
      datecommentaire: ['', Validators.required],
      uid: ['', Validators.required],
      idrecette: ['', Validators.required],
    });
  }
  create() {
    const formValues = this.formAddCommentaire.value;
    const commentaire = new Commentaire();
    // Récupération des valeurs du formulaire
    commentaire.idcommentaire = this.formAddCommentaire.value.idcommentaire;
    commentaire.commentaire = this.formAddCommentaire.value.commentaire;
    commentaire.notecommentaire = this.formAddCommentaire.value.notecommentaire;
    commentaire.datecommentaire = this.formAddCommentaire.value.datecommentaire;
    commentaire.uid = this.formAddCommentaire.value.uid;
    commentaire.idrecette = this.formAddCommentaire.value.idrecette;

    // Envoi de la requête de création d'une étape
    this.commentaireService
      .saveCommentaire(commentaire)
      .subscribe((response) => {
        // Réinitialisation du formulaire après création d'une étape
        this.router.navigate(['/commentaire']);
      });
  }
}
