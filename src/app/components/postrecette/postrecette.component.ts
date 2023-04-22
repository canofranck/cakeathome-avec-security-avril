import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecetteService } from 'src/app/services/recette/recette.service';
import { Recette } from 'src/app/models/recette/recette';
import { concatMap, delay } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-postrecette',
  templateUrl: './postrecette.component.html',
  styleUrls: ['./postrecette.component.css'],
})
export class PostrecetteComponent implements OnInit {
  declare form: FormGroup;
  declare ingredient: any;
  declare formaddIngredient: FormGroup;
  addingre = false;
  cachebuttoningredient = true;
  cachebuttonetape = true;
  afficheretape = false;
  declare recettes: any;
  idrecetteencours!: number;
  declare form2: FormGroup;
  declare recette: Recette;
  declare recette2: Recette;
  uid: number = 0;
  // @Input() idrecetteencours! : number;

  constructor(
    private recetteService: RecetteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ingredientService: IngredientsService,
    private notifier: NotifierService
  ) {}
  ngOnInit(): void {
    this.gettoken();
    this.formaddIngredient = this.formBuilder.group({
      // idingredient:['',Validators.required],
      idrecette: ['', Validators.required],
      quantiteingredient: ['', Validators.required],
    });

    this.form = this.formBuilder.group({
      idrecette: [''],
      titrerecette: ['', Validators.required],
      daterecette: [new Date()],
      descriptionrecette: ['', Validators.required],
      categorierecette: ['', Validators.required],
      niveaudifficulterecette: ['', Validators.required],
      tempspreparationrecette: ['', Validators.required],
      tempscuissonrecette: ['', Validators.required],
      tempstotalrecette: ['', Validators.required],
      nbpersonnerecette: ['1', Validators.required],
      recettepremiumrecette: [''],
      uid: [this.uid],
    });
  }
  create() {
    const formValues = this.form.value;
    const recette2 = new Recette();
    recette2.titrerecette = this.form.value.titrerecette;
    recette2.daterecette = new Date();
    recette2.descriptionrecette = this.form.value.descriptionrecette;

    // Vérifier que l'élément de formulaire "categorierecette" existe avant d'utiliser la méthode "get()"
    if (formValues && formValues.categorierecette) {
      recette2.categorierecette = formValues.categorierecette;
    }
    recette2.niveaudifficulterecette = this.form.value.niveaudifficulterecette;
    recette2.tempspreparationrecette = this.form.value.tempspreparationrecette;
    this.form.patchValue({
      tempspreparationrecette:
        this.form.value.tempspreparationrecette.concat(' min'),
    });
    recette2.tempscuissonrecette = this.form.value.tempscuissonrecette.endsWith(
      'min'
    )
      ? this.form.value.tempscuissonrecette
      : this.form.value.tempscuissonrecette.concat(' min');
    this.form.patchValue({
      tempscuissonrecette: this.form.value.tempscuissonrecette.concat(' min'),
    });
    recette2.tempstotalrecette = this.form.value.tempstotalrecette.endsWith(
      'min'
    )
      ? this.form.value.tempstotalrecette
      : this.form.value.tempstotalrecette.concat(' min');
    this.form.patchValue({
      tempstotalrecette: this.form.value.tempstotalrecette.concat(' min'),
    });
    recette2.nbpersonnerecette = this.form.value.nbpersonnerecette;
    recette2.recettepremiumrecette = this.form.value.recettepremiumrecette;

    recette2.idrecette = this.idrecetteencours;

    this.recetteService
      .updateRecette2(this.form.value, this.idrecetteencours)
      .subscribe(() => {
        this.notifier.notify('success', 'Recette enregistrer avec succes ');
        this.router.navigate(['/home']);
      });
  }
  affingre() {
    this.addingre = true;
    this.cachebuttoningredient = false;

    const recette = new Recette();
    recette.daterecette = new Date();
    recette.titrerecette = '';
    recette.descriptionrecette = '';
    recette.categorierecette = '';
    recette.niveaudifficulterecette = '';
    recette.tempspreparationrecette = '';
    recette.tempscuissonrecette = '';
    recette.tempstotalrecette = '';
    recette.nbpersonnerecette = '';
    recette.recettepremiumrecette = false;
    recette.uid = this.uid;

    this.recetteService
      .saveRecette(recette)
      .pipe(concatMap(() => this.recetteService.findAllRecettes()))
      .subscribe((data) => {
        this.recettes = Object.values(data);
        this.recettes.sort(
          (a: { daterecette: number }, b: { daterecette: number }) =>
            a.daterecette < b.daterecette ? 1 : -1
        );

        this.idrecetteencours = this.recettes[0].idrecette;
        if ((this.recettes[0].uid = this.uid)) {
          this.recetteService.setIdRecetteEncours(this.idrecetteencours);
        }
      });
  }

  cacheringr() {
    this.addingre = false;
  }
  affetapes() {
    this.afficheretape = true;
    this.cachebuttonetape = false;
  }
  cachetape() {
    this.afficheretape = false;
  }
  gettoken() {
    const token = localStorage.getItem('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      const tokenPayload = jwtHelper.decodeToken(token);
      const username = tokenPayload.sub;
      const uid = tokenPayload.uid;

      this.uid = uid;
    }
  }
}
