import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Ingredients } from 'src/app/models/ingredients/ingredients';
import { Recette } from 'src/app/models/recette/recette';
import { Recetteingredient } from 'src/app/models/recetteingredient/recetteingredient';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecetteService } from 'src/app/services/recette/recette.service';
import { RecetteingredientService } from 'src/app/services/recetteingredient/recetteingredient.service';


@Component({
  selector: 'app-add-recetteingredient',
  templateUrl: './add-recetteingredient.component.html',
  styleUrls: ['./add-recetteingredient.component.css']
})
export class AddRecetteingredientComponent implements OnInit{
  declare formaddRecetteIngredient: FormGroup;
  declare ingredients :Ingredients[];
  //  declare recettes:Recette[];
  //  declare recetteingredient:Recetteingredient;
   declare selectedRecette: Recette;
   declare selectedIngredient: Ingredients;
  constructor (
    private recetteingredientService : RecetteingredientService,
    private ingredientservice : IngredientsService,
    private recetteservice : RecetteService,
    private formBuilder: FormBuilder,
    private router : Router,

  ){}
    ngOnInit(): void {
         this.formaddRecetteIngredient = this.formBuilder.group({
          id_recetteingredients:['',Validators.required],
        quantite:['',Validators.required],
         id_recette:['',Validators.required],
         id_ingredient:['',Validators.required],
          // ingredients: ['', Validators.required],
          // recettes: ['', Validators.required],
       })

        // this.ingredientservice.findAllIngredients().pipe(map(data => {
        //   return data as Ingredients[];
        // })).subscribe(ingredient => {
        //   this.ingredients = ingredient;
        // });
        // this.recetteservice.findAllRecettes().pipe(map(data => {
        //   return data as Recette[];
        // })).subscribe(recette => {
        //   this.recettes = recette;
        // });
  }
  create() {
    this.ingredientservice.editIngredient(this.formaddRecetteIngredient.value.id_ingredient).subscribe(
      (ingredient) => {
        if(ingredient) {
          this.formaddRecetteIngredient.value.ingredient = ingredient;
          console.log(ingredient)
          console.log(this.formaddRecetteIngredient.value.ingredient)


//           this.recetteingredientService.saveRecetteIngredients(this.formaddRecetteIngredient.value).subscribe(
//             () => {
//               // this.router.navigate(['/abonnement'])
//             },
//  (error) => {
//             console.error(error);
//             // Afficher un message d'erreur à l'utilisateur
//           }
//         )
      }
      else {
        console.error("L'édition de l abonnement a échoué");
        // Afficher un message d'erreur à l'utilisateur
      }
    },
    (error) => {
      console.error(error);
      // Afficher un message d'erreur à l'utilisateur
    }
  );
  this.recetteservice.editRecette(this.formaddRecetteIngredient.value.id_recette).subscribe(
    (recette) => {
      if(recette) {
        this.formaddRecetteIngredient.value.recette = recette;
        console.log(recette)
        console.log(this.formaddRecetteIngredient.value.recette)
        // console.log(ingredient)
        // console.log(this.formaddRecetteIngredient.value.ingredient)


        this.recetteingredientService.saveRecetteIngredients(this.formaddRecetteIngredient.value).subscribe(
          () => {
             this.router.navigate(['/recetteingredient'])
          },
(error) => {
          console.error(error);
          // Afficher un message d'erreur à l'utilisateur
        }
      )
    }
    else {
      console.error("L'édition de l abonnement a échoué");
      // Afficher un message d'erreur à l'utilisateur
    }
  },
  (error) => {
    console.error(error);
    // Afficher un message d'erreur à l'utilisateur
  }
);





    // if (!this.selectedIngredient || !this.selectedRecette) {
    //   alert("Veuillez sélectionner une recette et un ingrédient");
    //   return;
    // }

    // const id_recetteingredients = this.formaddRecetteIngredient.get('id_recetteingredients')?.value || null;
    // const quantite = this.formaddRecetteIngredient.get('quantite')?.value || null;
    // console.log(this.selectedIngredient);
    // console.log(this.selectedRecette);
    //  console.log(this.ingredients);
    // console.log(this.recettes)
    // const newRecetteIngredient = new Recetteingredient(
    //   id_recetteingredients,
    //   quantite,
    //   this.selectedIngredient,
    //   this.selectedRecette
    // );

    // this.recetteingredientService.saveRecetteIngredients(newRecetteIngredient).subscribe(
    //   () => {
        // this.router.navigate(['recetteingredient']);
      }
    // );
  }

    // let recetteingredient = new Recetteingredient(this.selectedIngredient, this.selectedRecette, this.formaddRecetteIngredient.value.quantite);
    // console.log(this.formaddRecetteIngredient.value);
    // console.log("recettes"+recetteingredient);
    // this.recetteingredientService.saveRecetteIngredients(recetteingredient).subscribe(
    //   () =>{
    //     this.router.navigate(['recetteingredient']);
    //   }
    // );

    // onSelectIngredient(ingredient: Ingredients) {
    //   if (!ingredient) {
    //   alert("Veuillez sélectionner un ingrédient");
    //   return;
    //   }
    //   this.selectedIngredient = ingredient;
    //   console.log("log ingredients"+ingredient);
    //   }

    //   onSelectRecette(recette: Recette) {
    //   if (!recette) {
    //   alert("Veuillez sélectionner une recette");
    //   return;
    //   }
    //   this.selectedRecette = recette;
    //   console.log("log recette"+recette);
    //   }



