import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients/ingredients';
import { Recette } from 'src/app/models/recette/recette';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecetteService } from 'src/app/services/recette/recette.service';
import { RecetteingredientService } from 'src/app/services/recetteingredient/recetteingredient.service';

@Component({
  selector: 'app-edit-recetteingredient',
  templateUrl: './edit-recetteingredient.component.html',
  styleUrls: ['./edit-recetteingredient.component.css']
})
export class EditRecetteingredientComponent  implements OnInit{
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
    private route: ActivatedRoute,

  ){}
    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
         this.formaddRecetteIngredient = this.formBuilder.group({
          id_recetteingredients:['',Validators.required],
        quantite:['',Validators.required],
         id_recette:['',Validators.required],
         id_ingredient:['',Validators.required],

       })
        //récupere le produit via l'id
    this.recetteingredientService.editRecetteIngredients(id).subscribe(
      data => {
        console.log(data)
        //complete le form avec le produit récupéré
        this.formaddRecetteIngredient.setValue(data);
      }
    )

}
update() {

  if (this.formaddRecetteIngredient.valid) {

    console.log(this.formaddRecetteIngredient.value);

    this.recetteingredientService.updateRecetteIngredients(this.formaddRecetteIngredient.value).subscribe(
      () => {
        this.router.navigate(['/recetteingredient'])

      }
    )
  }
}
}
