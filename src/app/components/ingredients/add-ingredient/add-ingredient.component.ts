import { PostrecetteComponent } from './../../postrecette/postrecette.component';
import { Ingredients } from 'src/app/models/ingredients/ingredients';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css'],
})
export class AddIngredientComponent implements OnInit {
  declare formaddIngredient: FormGroup;
  declare ingredient: Ingredients;
  declare listeingredient: any;

  nouveau_tableau: any[] = [];
  @Input() addingree!: boolean;
  @Input() idrecetteencours!: number;

  @Output()
  public cacheringre: EventEmitter<any> = new EventEmitter<any>();
  declare recettes: any;

  constructor(
    private ingredientService: IngredientsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private recetteService: RecetteService
  ) {}
  ngOnInit(): void {
    // Initialisation du formulaire
    this.formaddIngredient = this.formBuilder.group({
      idingredient: ['', Validators.required],
      idrecette: ['', Validators.required],
      quantiteingredient: ['', Validators.required],
    });
    // Récupération des recettes
    this.recetteService.findAllRecettes().subscribe((data) => {
      // La variable "recettes" est initialisée avec les données renvoyées, qui sont sous forme d'objet.
      this.recettes = Object.values(data);
      // Les recettes sont triées par ordre décroissant en fonction de leur date de création.
      this.recettes.sort(
        (a: { date_recette: number }, b: { date_recette: number }) =>
          a.date_recette < b.date_recette ? 1 : -1
      );
      // La variable "idrecetteencours" est initialisée avec l'ID de la première recette (la plus récente).
      this.idrecetteencours = this.recettes[0].idrecette;
      this.idrecetteencours += 1;
      // La méthode "setIdRecetteEncours" du service "recetteService" est appelée pour initialiser l'ID de la recette en cours.
      this.recetteService.setIdRecetteEncours(this.idrecetteencours);
    });
  }
  create() {
    // Création d'un nouvel ingrédient à partir du formulaire
    const formValues = this.formaddIngredient.value;
    const ingredient = new Ingredients();

    ingredient.idingredient = this.formaddIngredient.value.idingredient;
    ingredient.idrecette = this.idrecetteencours;
    ingredient.quantiteingredient =
      this.formaddIngredient.value.quantiteingredient;
    this.nouveau_tableau.push(ingredient);
    // Sauvegarde de l'ingrédient dans la base de données

    this.ingredientService.saveIngredient(ingredient).subscribe((response) => {
      // Réinitialisation du formulaire après la sauvegarde
      this.formaddIngredient.reset();
    });
  }
  cahingre() {
    // Émission d'un événement pour cacher le composant
    this.cacheringre.emit({});
  }
}
