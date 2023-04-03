import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Recette } from 'src/app/models/recette/recette';
import { RecetteService } from 'src/app/services/recette/recette.service';
import { GallerieService } from '../../services/gallerie/gallerie.service';

@Component({
  selector: 'app-recetteparcategorie',
  templateUrl: './recetteparcategorie.component.html',
  styleUrls: ['./recetteparcategorie.component.css']
})
export class RecetteparcategorieComponent implements OnInit {
  declare recettes : any[];
  declare categorie: string;
 declare recettesFiltrees: Recette[];
  declare gallerie :any;
  public  page: number = 1;
  public  recettesParPage: number = 1;
  public nombreRecettesAffichees: number = 6;
  public debutnombrecetteaffichees: number =0;
  public affichesearch : boolean = false;
  constructor(

    private recetteService: RecetteService,
     private route: ActivatedRoute,
     private gallerieService : GallerieService,
     private router: Router,

     ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categorie = params.get('categorie')??'';
      this.recetteService.findAllRecettes().subscribe(
        data =>{
          // console.table(data);
            this.recettes = data as any[];
            console.log(this.recettes);
            this.recettesFiltrees = this.recettes.filter((recette: Recette) => recette.categorie_recette === this.categorie);
            console.log(this.recettesFiltrees);
        }
      );
    });
    this.getGalleries();
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe(() => {
      console.log('Redirection effectuée !');
      // recharger la liste des dernières recettes

    });
  }
  getGalleries() {
    this.gallerieService.findAllGalleries().subscribe(
       (data=>{
         this.gallerie = data;
  console.log(this.gallerie);
       }
         )

     )
   }

  afficherPlus(): void {
    if ( this.nombreRecettesAffichees<this.recettesFiltrees.length){
    this.nombreRecettesAffichees += 6;
    this.debutnombrecetteaffichees +=6;}
    console.log("debut "+this.debutnombrecetteaffichees+"   nbaffiches "+this.nombreRecettesAffichees)

  }
  afficherMoins(): void {
    if (this.debutnombrecetteaffichees>=7){
      this.nombreRecettesAffichees -= 6;
      this.debutnombrecetteaffichees -=6;
    }
    else{this.debutnombrecetteaffichees=0;
    this.nombreRecettesAffichees=6;
    }
    console.log("debut "+this.debutnombrecetteaffichees+"   nbaffiches "+this.nombreRecettesAffichees)
  }
  search() : void {
    this.affichesearch = true;
    console.log(this.affichesearch);

  }
}
