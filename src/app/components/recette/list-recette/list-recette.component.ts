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
  totalItems: number = 0;
currentPage: number = 0;
pageSize: number = 5;
offset: number = 0;
start=0;
end=5;
  constructor (
    private recetteService : RecetteService,
    private router : Router,
    private route: ActivatedRoute
    ){

}
ngOnInit(): void {
  this.recetteService.findAllRecettes().subscribe(
    data =>{


        this.recettes = data as any[];
        this.totalItems = this.recettes.length;

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
onPageChange(event: { offset: number; }) {
  this.offset = event.offset;

  if (this.offset < this.currentPage) {
    this.currentPage = this.offset;
    console.log("dans le if currentpage=  "+this.currentPage)
    this.start -= 5;
    this.end -= 5;
    console.log("offset : "+this.offset)
    console.log("start : "+this.start)
    console.log("end : "+this.end)
    for(let i=this.start;i<this.end;i++){
      this.recettes = this.recettes.slice(this.start, this.end).concat([]);
    }

  } else if (this.offset > this.currentPage) {
    this.currentPage = this.offset;
    console.log("dans le else if currentpage=  "+this.currentPage)
    this.start += 5;
    this.end += 5;
    console.log("offset : "+this.offset)
    console.log("start : "+this.start)
    console.log("end : "+this.end)
    for(let i=this.start;i<this.end;i++){
        if(this.recettes[i]){
          this.recettes = this.recettes.slice(this.start, this.end).concat([]);
        }
    }
  } else {
    console.log("dans le else final ")
    return;
  }
}







}
