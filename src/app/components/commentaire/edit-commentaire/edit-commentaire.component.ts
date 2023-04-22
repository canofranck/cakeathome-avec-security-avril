import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Commentaire } from 'src/app/models/commentaire/commentaire';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';

@Component({
  selector: 'app-edit-commentaire',
  templateUrl: './edit-commentaire.component.html',
  styleUrls: ['./edit-commentaire.component.css'],
})
export class EditCommentaireComponent implements OnInit {
  declare editcommentaireForm: FormGroup;
  commentaire: Commentaire = new Commentaire();
  utilisateur: any = {};
  recette: any = {};
  constructor(
    private commentaireService: CommentaireService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.editcommentaireForm = this.formBuilder.group({
      idcommentaire: ['', Validators.required],
      commentaire: ['', Validators.required],
      notecommentaire: ['', Validators.required],
      datecommentaire: ['', Validators.required],
      uid: ['', Validators.required],
      idrecette: ['', Validators.required],
    });
    //récupere le commentaire via l'id
    this.commentaireService.editCommentaire(id).subscribe((data: any) => {
      //complete le form avec le commentaire récupéré
      this.editcommentaireForm.patchValue({
        idcommentaire: data.idcommentaire,
        uid: data.uid,
        idrecette: data.idrecette,
        commentaire: data.commentaire,

        notecommentaire: data.notecommentaire,
        datecommentaire: data.datecommentaire,
      });

      this.recette = data.recette;
    });
  }
  update() {
    if (this.editcommentaireForm.valid) {
      let data = this.editcommentaireForm.value;

      data.recette = this.recette;

      this.commentaireService.updateCommentaire(data).subscribe(() => {
        this.router.navigate(['/commentaire']);
      });
    }
  }
}
