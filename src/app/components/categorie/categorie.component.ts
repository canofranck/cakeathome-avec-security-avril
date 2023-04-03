import { Component, OnInit } from '@angular/core';
import { Recette } from 'src/app/models/recette/recette';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  declare recettes : any[]; // Déclaration d'un tableau pour stocker toutes les recettes
  declare nombresRecettesParCategorie: any[]; // Déclaration d'un tableau pour stocker le nombre de recettes par catégorie
  constructor (private recetteService : RecetteService,

    ){

}
  ngOnInit(): void {
    // Appel du service pour récupérer toutes les recettes
    this.recetteService.findAllRecettes().subscribe(
      data =>{
          this.recettes = data as any[]; // Stockage des recettes dans le tableau
          this.nombresRecettesParCategorie = this.compterRecettesParCategorie(this.recettes); // Comptage des recettes par catégorie
            }
    );



  }
// Fonction pour compter le nombre de recettes par catégorie
  compterRecettesParCategorie(recettes: any[]): any[] {
    // La méthode reduce permet de transformer un tableau en une seule valeur en appliquant une fonction réductrice
  // Ici, on utilise reduce pour compter le nombre de recettes par catégorie
    const resultats = recettes.reduce((acc, recette) => {
      const categorie = recette.categorie_recette;  // Pour chaque recette, on récupère sa catégorie
      if (categorie in acc) { // Si la catégorie a déjà été rencontrée, on incrémente le nombre de recettes associé
        acc[categorie]++;
      } else { // Sinon, on ajoute une nouvelle entrée avec un compteur initialisé à 1
        acc[categorie] = 1;
      }
      return acc;  // On retourne l'accumulateur pour la prochaine itération
    }, {}); // On initialise l'accumulateur avec un objet vide {}

//     L'objet vide {} est utilisé comme valeur initiale de l'accumulateur dans la fonction reduce().

// Lors de la première itération de la boucle, la fonction reduce() passe cet objet vide comme valeur d'accumulateur et utilise la première valeur de la liste de recettes (recettes[0]) comme première valeur de l'élément courant (recette).

// Ensuite, la fonction vérifie si la catégorie de la recette (recette.categorie_recette) est déjà présente dans l'objet accumulateur (acc), si elle l'est, elle incrémente la valeur correspondante de l'objet acc de 1. Si la catégorie n'est pas encore présente dans l'objet accumulateur, elle l'ajoute avec une valeur de 1.

// La fonction reduce() itère ensuite sur tous les éléments de la liste, mettant à jour l'objet accumulateur acc à chaque itération. Finalement, la fonction reduce() renvoie l'objet accumulateur mis à jour.

// En somme, on initialise l'accumulateur avec un objet vide {} pour s'assurer qu'il est de type objet et qu'il dispose de toutes les clés des catégories avant d'appliquer la fonction reduce(), pour éviter des erreurs d'exécution.

    // On transforme le résultat en un tableau d'objets avec deux propriétés : la catégorie et le nombre de recettes associé
  // La méthode Object.entries permet de récupérer un tableau de paires clé-valeur à partir d'un objet
    return Object.entries(resultats).map(([categorie, nombre]) => ({ categorie, nombre }));
  }
  // Fonction pour récupérer le chemin de la catégorie
  getCheminCategorie(categorie: string): string {
    return '/recettes/' + categorie;
  }

}



