import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recetteingredient } from 'src/app/models/recetteingredient/recetteingredient';
import { RecetteingredientService } from 'src/app/services/recetteingredient/recetteingredient.service';

@Component({
  selector: 'app-list-recetteingredient',
  templateUrl: './list-recetteingredient.component.html',
  styleUrls: ['./list-recetteingredient.component.css']
})
export class ListRecetteingredientComponent {
  declare recetteingredients : any ;
  constructor (
    private recetteingredientService : RecetteingredientService,
    private router : Router,
    private route: ActivatedRoute
    ){

}
ngOnInit(): void {
  this.recetteingredientService.findAllRecetteIngredients().subscribe(
    data =>{
      console.table(data);
        this.recetteingredients = data;
        console.log(data as Recetteingredient );
    }
  )
  if (this.route.snapshot.paramMap.get('id') != null) {

    this.remove();
  }
}
remove() {

  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.recetteingredientService. deleteRecetteIngredients(id).subscribe(
    () => {
      this.router.navigate(['/recetteingredient'])
    }
  )
}
}
