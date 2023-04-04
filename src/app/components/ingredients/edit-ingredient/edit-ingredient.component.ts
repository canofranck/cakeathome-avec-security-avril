import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Ingredients } from "src/app/models/ingredients/ingredients";
import { IngredientsService } from "src/app/services/ingredients/ingredients.service";


@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit {

  declare formeditIngredient: FormGroup;
  declare ingredient: Ingredients;
  constructor(

    private ingredientService : IngredientsService,
    private router : Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
  ) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formeditIngredient = this.formBuilder.group({
      idingredient:['',Validators.required],
      idrecette:['',Validators.required],
      quantiteingredient:['',Validators.required],



    })
    //récupere le produit via l'id
    this.ingredientService.editIngredient(id).subscribe(
      data => {
        console.log(data)
        //complete le form avec le produit récupéré
        this.formeditIngredient.setValue(data);
      }
    )
  }
  update() {

    if (this.formeditIngredient.valid) {

      console.log(this.formeditIngredient.value);

      this.ingredientService.updateIngredient(this.formeditIngredient.value).subscribe(
        () => {
          this.router.navigate(['/ingredient'])

        }
      )
    }
  }

}
