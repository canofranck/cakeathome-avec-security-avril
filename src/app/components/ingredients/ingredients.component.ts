import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients/ingredients';
import { Recette } from 'src/app/models/recette/recette';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements  OnInit {
  declare ingredient: Ingredients;
  declare recette : Recette[];
  declare form : FormGroup;

  constructor(
    private ingredientService: IngredientsService,
    private router : Router,
    private route: ActivatedRoute,

    )
     {}

  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients() {
    return this.ingredientService.findAllIngredients().subscribe(
      data => {
        console.log(data);
        this.ingredient = data as Ingredients;
        // this.getRecetteParIngredient();
      }
    )
  }
  // getRecetteParIngredient (){
  //   this.ingredientService.getRecetteParIngredient (this.ingredient.id_ingredient).subscribe(
  //     recette =>this.recette=Recette
  //   );
  // }
  // deleteUser(id: number) {

  //   this.utilisateurService.deleteUser(id).subscribe
  //     (
  //       () => {
  //         this.router.navigate(['/utilisateur'])
  //       }
  //     )


  // }
}
