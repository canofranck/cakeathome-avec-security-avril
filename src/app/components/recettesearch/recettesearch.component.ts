import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { Recette } from '../../models/recette/recette';
import { GallerieService } from '../../services/gallerie/gallerie.service';
import { IngredientsService } from '../../services/ingredients/ingredients.service';
import { RecetteService } from '../../services/recette/recette.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-recettesearch',
  templateUrl: './recettesearch.component.html',
  styleUrls: ['./recettesearch.component.css'],
})
export class RecettesearchComponent implements OnInit {
  declare recettes: any[];
  declare categorie: string;
  declare recettesFiltrees: Recette[];
  declare gallerie: any;
  public page: number = 1;
  public recettesParPage: number = 1;
  public nombreRecettesAffichees: number = 6;
  public debutnombrecetteaffichees: number = 0;

  declare ingredients: any;
  recettesTrouvees: any[] = [];
  declare searchTerm: string;
  public moyenne: number = 0;
  constructor(
    private recetteService: RecetteService,
    private route: ActivatedRoute,
    private gallerieService: GallerieService,
    private ingredientService: IngredientsService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Récupération du paramètre de l'URL
    this.route.paramMap.subscribe((params) => {
      // Récupération de la catégorie depuis l'URL, si aucune catégorie n'est fournie, une chaîne vide est renvoyée
      this.categorie = params.get('categorie') ?? '';
      // Récupération de toutes les recettes depuis le service
      this.recetteService.findAllRecettes().subscribe((data) => {
        this.recettes = data as any[];
      });
      // Récupération de tous les ingrédients depuis le service

      this.ingredientService.findAllIngredients().subscribe((data) => {
        this.ingredients = data;
      });
    });
    // Récupération de toutes les galeries depuis le service
    this.getGalleries();
    // Abonnement aux événements de navigation de l'URL
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe(() => {
        // recharger la liste des dernières recettes
      });
  }
  // Fonction pour récupérer toutes les galeries depuis le service
  getGalleries() {
    this.gallerieService.findAllGalleries().subscribe((data) => {
      this.gallerie = data;
    });
  }
  // Fonction pour afficher plus de recettes sur la page
  afficherPlus(): void {
    if (this.nombreRecettesAffichees < this.recettesTrouvees.length) {
      this.nombreRecettesAffichees += 6;
      this.debutnombrecetteaffichees += 6;
    }
  }
  // Fonction pour afficher moins de recettes sur la page
  afficherMoins(): void {
    if (this.debutnombrecetteaffichees >= 7) {
      this.nombreRecettesAffichees -= 6;
      this.debutnombrecetteaffichees -= 6;
    } else {
      this.debutnombrecetteaffichees = 0;
      this.nombreRecettesAffichees = 6;
    }
  }

  // Fonction de recherche des recettes
  rechercher(searchTerm: string) {
    // On réinitialise le tableau des recettes trouvées à chaque nouvelle recherche
    this.recettesTrouvees = [];

    // On vérifie si un terme de recherche a été entré
    if (searchTerm) {
      // On divise le terme de recherche en plusieurs mots clés en utilisant l'espace comme séparateur
      const motsCles = searchTerm.split(' ');

      // On parcourt la liste des ingrédients
      for (let i = 0; i < this.ingredients.length; i++) {
        // On récupère l'ingrédient courant
        const ingredient = this.ingredients[i];
        // On récupère le nom de l'ingrédient
        const nomIngredient = ingredient.quantiteingredient;

        // On initialise la variable de correspondance à faux
        let match = false;

        // On parcourt tous les mots clés
        for (let j = 0; j < motsCles.length; j++) {
          // On récupère le mot clé courant
          const motCle = motsCles[j];
          // On vérifie si le nom de l'ingrédient contient le mot clé
          if (nomIngredient.includes(motCle)) {
            // Si oui, on met la variable de correspondance à vrai et on sort de la boucle
            match = true;
            break;
          }
        }

        // Si on a trouvé une correspondance entre un mot clé et l'ingrédient
        if (match) {
          // On récupère l'identifiant de la recette correspondante
          const idRecette = ingredient.idrecette;
          // On cherche la recette correspondante dans le tableau des recettes
          const recette = this.recettes.find((r) => r.idrecette === idRecette);
          // Si on a trouvé une recette correspondante, on l'ajoute au tableau des recettes trouvées
          if (recette) {
            // On vérifie si la recette n'est pas déjà dans le tableau des recettes trouvées
            if (!this.recettesTrouvees.includes(recette)) {
              this.recettesTrouvees.push(recette);
              this.recettesTrouvees.forEach((recette) => {
                this.userService.getuser(recette.uid).subscribe((user) => {
                  recette.username = user.username;
                });
              });
            }
          }
        }
      }
    }
  }
}
