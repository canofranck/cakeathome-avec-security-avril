import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GallerieService } from 'src/app/services/gallerie/gallerie.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements  OnInit{

  recettes: any[] = []; // Tableau pour stocker toutes les recettes
  public randomRecettes: any[] = []; // Tableau pour stocker les recettes aléatoires
  public i: number = 0;  // Variable pour le compteur
  declare gallerie :any; // Déclaration de la galerie
  isCalledFromHome = false;  // Booléen pour vérifier si l'utilisateur arrive depuis la page d'accueil
  public moyenne:number=0;

  constructor (
  private recetteService: RecetteService, // Service pour les recettes
  private gallerieService : GallerieService, // Service pour les galeries
  private route: ActivatedRoute  // ActivatedRoute pour obtenir des informations sur l'URL actuelle
  ){}
   ngOnInit(): void {


this.getRecettesRandom(); // Récupération des recettes aléatoires
this.getGalleries(); // Récupération de la galerie
// Vérifie si l'utilisateur arrive depuis la page d'accueil
const url = this.route.snapshot.url.join('/');
this. isCalledFromHome = url.includes('recetterandom');
   }
 // Récupération de toutes les recettes
   getRecettes() {
    this.recetteService.findAllRecettes().subscribe(
      data =>{
        // console.table(data);
          this.recettes = data as any[];
        //  console.table(this.recettes)
            }
    );

}
// Récupération des recettes aléatoires
getRecettesRandom() {
  this.recetteService.findAllRecettes().subscribe(
    data => {
      this.recettes = data as any[];       // Stockage des données dans le tableau "recettes"
      let randomRecettes: any[] = []; // Initialisation d'un tableau vide pour stocker les recettes aléatoires
      //  La boucle while sélectionne une recette aléatoire et vérifie si elle n'a pas encore été ajoutée au tableau randomRecettes
      while (randomRecettes.length < 3) {
         // Génération d'un index aléatoire entre 0 et la longueur du tableau "recettes"
        let randomIndex = Math.floor(Math.random() * this.recettes.length);
        // Sélection de la recette correspondante à l'index aléatoire
        let randomRecette = this.recettes[randomIndex];
        // Vérification si la recette sélectionnée n'a pas encore été ajoutée au tableau "randomRecettes"
        if (!randomRecettes.includes(randomRecette)) {
           // Ajout de la recette au tableau "randomRecettes"
          randomRecettes.push(randomRecette);
        }
      }
      // Stockage du tableau "randomRecettes" dans la variable "randomRecettes"
      this.randomRecettes = randomRecettes;


    }
  );

}
// Récupération de la galerie
getGalleries() {
  this.gallerieService.findAllGalleries().subscribe(
     (data=>{
       this.gallerie = data;
// console.log(this.gallerie);
     }
       )

   )
 }
}
