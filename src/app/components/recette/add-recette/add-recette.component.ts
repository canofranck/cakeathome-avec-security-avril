import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Ingredients } from 'src/app/models/ingredients/ingredients';
import { Recette } from 'src/app/models/recette/recette';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-add-recette',
  templateUrl: './add-recette.component.html',
  styleUrls: ['./add-recette.component.css']
})
export class AddRecetteComponent implements OnInit{
  declare formaddRecette: FormGroup;
  declare formaddIngredient: FormGroup;
  declare recette:Recette;
  constructor (

    private recetteService: RecetteService,
   private ingredientService: IngredientsService,
    private formBuilder: FormBuilder,
    private router : Router,


  ){}
    ngOnInit(): void {
        this.formaddRecette = this.formBuilder.group({
        titre_recette:['',Validators.required],
        date_recette:['',Validators.required],
        description_recette:['',Validators.required],
        categorie_recette:['',Validators.required],
        niveaudifficulte_recette:['',Validators.required],
        tempspreparation_recette:['',Validators.required],
        tempscuisson_recette:['',Validators.required],
        tempstotal_recette:['',Validators.required],
        nbpersonne_recette:['',Validators.required],
        recettepremium_recette:['',Validators.required],
        uid:['',Validators.required],
        // quantiteingredient:['',Validators.required],
        // id_ingredient:['',Validators.required],
        // ingredients:[[],,Validators.required],
        });

  }
  create(){
    const formValues = this.formaddRecette.value;
    const recette = new Recette();

      recette.titre_recette = this.formaddRecette.value.titre_recette;
      recette.date_recette = this.formaddRecette.value.date_recette;
      recette.description_recette = this.formaddRecette.value.description_recette;
      recette.categorie_recette = this.formaddRecette.value.categorie_recette;
      recette.niveaudifficulte_recette = this.formaddRecette.value.niveaudifficulte_recette;
      recette.tempspreparation_recette = this.formaddRecette.value.tempspreparation_recette;
      recette.tempscuisson_recette =this.formaddRecette.value.tempscuisson_recette;
      recette.tempstotal_recette = this.formaddRecette.value.tempstotal_recette;
      recette.nbpersonne_recette = this.formaddRecette.value.nbpersonne_recette;
      recette.recettepremium_recette = this.formaddRecette.value.recettepremium_recette;
      recette.uid = this.formaddRecette.value.uid;

      // recette.quantiteingredient = this.formaddRecette.value.quantiteingredient;

  // Enregistrer la recette
    // Enregistrer la recette
    // console.log(recette.quantiteingredient);
    // this.ingredientService.saveIngredient(this.formaddRecette.value).subscribe(
    //   () =>{

    //   }
    // );

  this.recetteService.saveRecette(recette).subscribe((response) => {
  console.log(response);
  this.router.navigate(['listrecette'])
 });
 }
}

//   this.recetteService.saveRecette(recette).subscribe((response) => {
//   console.log(response);
// });
// }
