import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.css'],
})
export class ListIngredientComponent {
  declare ingredient: any;
  constructor(
    private ingredientService: IngredientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.ingredientService.findAllIngredients().subscribe((data) => {
      this.ingredient = data;
    });
    if (this.route.snapshot.paramMap.get('id') != null) {
      this.remove();
    }
  }
  remove() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ingredientService.deleteIngredient(id).subscribe(() => {});
  }
}
