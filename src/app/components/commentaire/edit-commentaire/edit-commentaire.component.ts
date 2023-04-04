import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Commentaire } from 'src/app/models/commentaire/commentaire';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';

@Component({
  selector: 'app-edit-commentaire',
  templateUrl: './edit-commentaire.component.html',
  styleUrls: ['./edit-commentaire.component.css']
})
export class EditCommentaireComponent implements OnInit {

  declare editcommentaireForm: FormGroup;
  commentaire: Commentaire = new Commentaire();
  utilisateur : any={};
  recette : any={};
  constructor(
  private commentaireService : CommentaireService,
  private router : Router,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder,


  ) {
   }
  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.editcommentaireForm = this.formBuilder.group({
    idcommentaire: ['',Validators.required],
    commentaire: ['',Validators.required],
    imagecommentaire: ['',Validators.required],
    notecommentaire: ['',Validators.required],
    datecommentaire :['',Validators.required],
    uid: ['',Validators.required],
    idrecette: ['',Validators.required],
  })
  //récupere le produit via l'id
  this.commentaireService.editCommentaire(id).subscribe(
    (data :any) => {
      console.log(data)
      //complete le form avec le produit récupéré
      this.editcommentaireForm.patchValue({
          idcommentaire: data.idcommentaire,
          uid: data.utilisateur.uid,
          idrecette: data.recette.idrecette,
          commentaire: data.commentaire,
          imagecommentaire: data.imagecommentaire,
          notecommentaire: data.notecommentaire,
          datecommentaire : data.datecommentaire,
      });
      this.utilisateur=data.utilisateur;
      this.recette=data.recette;
    }
  )
  }
  update() {
    if (this.editcommentaireForm.valid) {
      let data = this.editcommentaireForm.value;
      data.utilisateur= this.utilisateur;
      let data2 = this.editcommentaireForm.value;
      data.recette= this.recette;
      console.log(this.editcommentaireForm.value);

      this.commentaireService.updateCommentaire(data).subscribe(
        () => {
        this.router.navigate(['/commentaire'])

        }
      )
    }
  }
  }
