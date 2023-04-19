import { CommentaireService } from './../../services/commentaire/commentaire.service';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GallerieService } from 'src/app/services/gallerie/gallerie.service';
import { RecetteService } from 'src/app/services/recette/recette.service';
import { Recette } from 'src/app/models/recette/recette';
import { filter } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Commentaire } from 'src/app/models/commentaire/commentaire';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-tendance',
  templateUrl: './tendance.component.html',
  styleUrls: ['./tendance.component.css']
})
export class TendanceComponent implements OnInit {
  recettes: any[] = [];

  public randomRecettes: any[] = [];
  public i: number = 0;
  declare gallerie :any; // Déclaration de la variable gallerie
  topRecettes: any[]=[]; // Tableau pour stocker les 3 recettes les plus vues
  isCalledFromHome = false;  // Booléen pour vérifier si l'utilisateur arrive depuis la page d'accueil
  public moyenne:number=0;

  constructor (
  private recetteService: RecetteService, // Service pour les recettes
  private gallerieService : GallerieService, // Service pour les galeries
  private userService:UserService,
  private router: Router, // Router pour naviguer entre les pages
  private route: ActivatedRoute,  // ActivatedRoute pour obtenir des informations sur l'URL actuelle
    ){}
  ngOnInit(): void {
    // this.getTopCommentaires();
this.getRecettestendance(); // Appel de la méthode getRecettestendance() pour obtenir les recettes les plus vues
    this.getGalleries(); // Appel de la méthode getGalleries() pour obtenir les galeries
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe(() => {
      // recharger la liste des dernières recettes

    });
    const url = this.route.snapshot.url.join('/');
    this. isCalledFromHome = url.includes('recettetendance');  // Vérifier si l'utilisateur arrive depuis la page d'accueil

    console.log(this.isCalledFromHome);
       }



       getRecettestendance() {
        this.recetteService.findAllRecettes().subscribe(
          data => {
            const recettes = data as any[]; // récupérer les données de l'API en tant que tableau de Recette

            // Vérifier si la liste de recettes n'est pas vide
            if (recettes.length > 0) {
              const topRecettes = recettes.sort((a, b) => b.nbvuerecette - a.nbvuerecette).slice(0, 3); // trier les recettes par nombre de vues et en prendre les 3 premières
console.log(recettes)
              // Ajouter le nom d'utilisateur à chaque recette de topRecettes
              topRecettes.forEach(recette => {
                this.userService.getuser(recette.uid).subscribe(user => {
                  recette.username = user.username;
                });
              });

              this.topRecettes=topRecettes; // stocker les recettes les plus vues dans la variable topRecettes
              console.log(topRecettes); // afficher les 3 recettes les plus vues
            }
            else {
              console.log("Aucune recette n'a été trouvée.");
            }
          },
          error => {
            console.log(error);  // afficher une erreur si la requête a échoué
          }
        );
      }






    getGalleries() {
      this.gallerieService.findAllGalleries().subscribe(
         (data=>{
           this.gallerie = data; // stocker les données de l'API dans la variable gallerie
    console.log(this.gallerie);
         }
           )

       )
     }
    }
