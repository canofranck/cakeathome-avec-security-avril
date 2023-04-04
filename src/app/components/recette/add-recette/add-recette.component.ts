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
        titrerecette:['',Validators.required],
        daterecette:['',Validators.required],
        descriptionrecette:['',Validators.required],
        categorierecette:['',Validators.required],
        niveaudifficulterecette:['',Validators.required],
        tempspreparationrecette:['',Validators.required],
        tempscuissonrecette:['',Validators.required],
        tempstotalrecette:['',Validators.required],
        nbpersonnerecette:['',Validators.required],
        recettepremiumrecette:['',Validators.required],
        uid:['',Validators.required],
        // quantiteingredient:['',Validators.required],
        // idingredient:['',Validators.required],
        // ingredients:[[],,Validators.required],
        });

  }
  create(){
    const formValues = this.formaddRecette.value;
    const recette = new Recette();

      recette.titrerecette = this.formaddRecette.value.titrerecette;
      recette.daterecette = this.formaddRecette.value.daterecette;
      recette.descriptionrecette = this.formaddRecette.value.descriptionrecette;
      recette.categorierecette = this.formaddRecette.value.categorierecette;
      recette.niveaudifficulterecette = this.formaddRecette.value.niveaudifficulterecette;
      recette.tempspreparationrecette = this.formaddRecette.value.tempspreparationrecette;
      recette.tempscuissonrecette =this.formaddRecette.value.tempscuissonrecette;
      recette.tempstotalrecette = this.formaddRecette.value.tempstotalrecette;
      recette.nbpersonnerecette = this.formaddRecette.value.nbpersonnerecette;
      recette.recettepremiumrecette = this.formaddRecette.value.recettepremiumrecette;
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
