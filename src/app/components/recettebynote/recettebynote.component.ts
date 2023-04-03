import { AfterViewInit, Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Recette } from 'src/app/models/recette/recette';
import { GallerieService } from 'src/app/services/gallerie/gallerie.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-recettebynote',
  templateUrl: './recettebynote.component.html',
  styleUrls: ['./recettebynote.component.css']
})
export class RecettebynoteComponent implements AfterViewInit{
  recettes: any[] = [];

  public randomRecettes: any[] = [];
  public i: number = 0;
  declare gallerie :any;
  noteRecettes: any[]=[];
  isCalledFromHome = false;  // Booléen pour vérifier si l'utilisateur arrive depuis la page d'accueil
  public moyenne:number=0;
  constructor (
  private recetteService: RecetteService,
  private gallerieService : GallerieService,

  private router: Router,
  private route: ActivatedRoute,
  ){}
  ngAfterViewInit(): void {

this.getRecettespopulaire();
    this.getGalleries();
    // Ecouter les changements de route (redirections)
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe(() => {
      console.log('Redirection effectuée !');
      // recharger la liste des dernières recettes
      this.getRecettespopulaire();
    });
    // Vérifier si l'utilisateur arrive depuis la page d'accueil
    const url = this.route.snapshot.url.join('/');
this. isCalledFromHome = url.includes('recettebynote');

console.log(this.isCalledFromHome);
       }




    getRecettespopulaire() {
      this.recetteService.findAllRecettes().subscribe(
        data => {
           // Convertir la réponse en un tableau d'objets de type Recette
          const recettes = data as Recette[];
           // Tri des recettes par ordre décroissant du nombre de likes, prendre les 3 premières
          const noteRecettes = recettes.sort((a, b) => b.notemoyenne - a.notemoyenne)  //.slice(0, 3);
          // Stocker les 3 recettes les plus aimées dans la variable popRecettes
          this.noteRecettes=noteRecettes;

        },
        error => {
          console.log(error); // Afficher une erreur éventuelle dans la console en cas de problème avec la requête
        }
      );
    }


    getGalleries() {
      this.gallerieService.findAllGalleries().subscribe(
         (data=>{
           this.gallerie = data; // Stocker les données de la réponse dans la variable galleried
    console.log(this.gallerie);
         }
           )

       )
     }
    }
