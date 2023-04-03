import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Recette } from 'src/app/models/recette/recette';
import { GallerieService } from 'src/app/services/gallerie/gallerie.service';
import { RecetteService } from 'src/app/services/recette/recette.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-populaire',
  templateUrl: './populaire.component.html',
  styleUrls: ['./populaire.component.css']
})
export class PopulaireComponent  implements AfterViewInit{
  recettes: any[] = [];


  public i: number = 0;
  declare gallerie :any;
  popRecettes: any[]=[];
  isCalledFromHome = false;  // Booléen pour vérifier si l'utilisateur arrive depuis la page d'accueil
  public moyenne:number=0;
  constructor (
  private recetteService: RecetteService,
  private gallerieService : GallerieService,
  private userService:UserService,
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
this. isCalledFromHome = url.includes('home');

console.log(this.isCalledFromHome);
       }




    getRecettespopulaire() {
      this.recetteService.findAllRecettes().subscribe(
        data => {
           // Convertir la réponse en un tableau d'objets de type Recette
          const recettes = data as any[];

          if(recettes.length > 0) { // Vérifier si le tableau de recettes est non vide
            // Tri des recettes par ordre décroissant du nombre de likes, prendre les 3 premières
            const popRecettes = recettes.sort((a, b) => b.nblike - a.nblike).slice(0, 3);

            // Ajouter le nom d'utilisateur à chaque recette de popRecettes
            popRecettes.forEach(recette => {
              this.userService.getuser(recette.uid).subscribe(user => {
                recette.username = user.username;
              });
            });

            // Stocker les 3 recettes les plus aimées dans la variable popRecettes
            this.popRecettes=popRecettes;
          }
          else {
            // Aucune recette n'a été trouvée, afficher un message ou traiter le cas de manière appropriée
            console.log("Aucune recette n'a été trouvée dans la base de données.");
          }

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
