import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-list-recette',
  templateUrl: './list-recette.component.html',
  styleUrls: ['./list-recette.component.css']
})
export class ListRecetteComponent {

  declare recettes : any ;
  constructor (
    private recetteService : RecetteService,
    private router : Router,
    private route: ActivatedRoute
    ){

}
ngOnInit(): void {
  this.recetteService.findAllRecettes().subscribe(
    data =>{
      console.table(data);
        this.recettes = data;
    }
  )
  if (this.route.snapshot.paramMap.get('id') != null) {

    this.remove();
  }
}
remove() {

  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.recetteService.deleteRecette(id).subscribe(
    () => {

    }
  )
}
}
