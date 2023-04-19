import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Recette } from 'src/app/models/recette/recette';
import { RecetteService } from 'src/app/services/recette/recette.service';
import { GallerieService } from '../../services/gallerie/gallerie.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-recetteparcategorie',
  templateUrl: './recetteparcategorie.component.html',
  styleUrls: ['./recetteparcategorie.component.css']
})
export class RecetteparcategorieComponent implements OnInit {
  declare recettes: any[];
  declare categorie: string;
  declare recettesFiltrees: Recette[];
  declare gallerie: any;
  public page: number = 1;
  public recettesParPage: number = 1;
  public nombreRecettesAffichees: number = 6;
  public debutnombrecetteaffichees: number = 0;
  public affichesearch: boolean = false;
   recetteAvecUsername: any[]=[];


  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private gallerieService: GallerieService,
    private router: Router,
    private userService: UserService,
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categorie = params.get('categorie') ?? '';
      this.recetteService.findAllRecettes().subscribe(data => {
        this.recettes = data as any[];

        this.recettesFiltrees = this.recettes.filter((recette: Recette) => recette.categorierecette === this.categorie);

        if (this.recettesFiltrees.length > 0) {
          const recetteAvecUsername: Recette[] = [];

          this.recettesFiltrees.forEach(recette => {
            const recetteCopie = Object.assign({}, recette);
            this.userService.getuser(recette.uid).subscribe(user => {
              recetteCopie.username = user?.username;
              recetteAvecUsername.push(recetteCopie);
            });
          });

          // Stocker le tableau avec les noms d'utilisateur dans une variable séparée
          this.recetteAvecUsername = recetteAvecUsername;
          console.log(this.recetteAvecUsername);
        }
      });
     } );

    this.getGalleries();
    // this.getusername();
    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log('Redirection effectuée !');
        // recharger la liste des dernières recettes

      });
  }
  getGalleries() {
    this.gallerieService.findAllGalleries().subscribe(
      (data => {
        this.gallerie = data;
        console.log(this.gallerie);
      }
      )

    )
  }

  afficherPlus(): void {
    if (this.nombreRecettesAffichees < this.recettesFiltrees.length) {
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
  getusername(){



        // // Vérifier si la liste de recettes n'est pas vide
        // if (this.recettesFiltrees.length > 0) {

        //   const recetteAvecUsername = this.recettesFiltrees; // tableau pour stocker les recettes avec les noms d'utilisateur
        //   // const recetteAvecUsername = { ...this.recettesFiltrees};
        //   this.recetteAvecUsername.forEach(recette => {
        //    // créer une copie de la recette pour ne pas modifier l'objet original
        //     this.userService.getuser(recette.uid).subscribe(user => {
        //      recette.username  = user.username; // ajouter le nom d'utilisateur à la copie de la recette
        //     });
        //     this.recetteAvecUsername.push(recette); // ajouter la recette avec le nom d'utilisateur au tableau
        //   });

        //   this.recetteAvecUsername = this.recetteAvecUsername;
        //   console.log(recetteAvecUsername); // afficher le tableau de recettes avec les noms d'utilisateur
        // }
      }



  }

