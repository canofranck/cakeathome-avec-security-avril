import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients/ingredients';
import { Recette } from 'src/app/models/recette/recette';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-edit-recette',
  templateUrl: './edit-recette.component.html',
  styleUrls: ['./edit-recette.component.css'],
})
export class EditRecetteComponent implements OnInit {
  declare formeditRecette: FormGroup;
  declare recette: Recette;
  declare ingredient: Ingredients;
  constructor(
    private recetteService: RecetteService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formeditRecette = this.formBuilder.group({
      titrerecette: ['', Validators.required],
      daterecette: ['', Validators.required],
      descriptionrecette: ['', Validators.required],
      categorierecette: ['', Validators.required],
      niveaudifficulterecette: ['', Validators.required],
      tempspreparationrecette: ['', Validators.required],
      tempscuissonrecette: ['', Validators.required],
      tempstotalrecette: ['', Validators.required],
      nbpersonnerecette: ['', Validators.required],
      recettepremiumrecette: ['', Validators.required],
      uid: ['', Validators.required],
      idrecette: ['', Validators.required],
      listIngredient: [[]],
    });
    //récupere la recette via l'id
    this.recetteService.editRecette(id).subscribe((data) => {
      //complete le form avec la recette récupéré
      this.formeditRecette.setValue(data);
    });
  }
  update() {
    if (this.formeditRecette.valid) {
      this.recetteService
        .updateRecette(this.formeditRecette.value)
        .subscribe(() => {
          this.router.navigate(['/listrecette']);
        });
    }
  }
}
