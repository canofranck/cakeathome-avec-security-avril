import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GallerieService } from 'src/app/services/gallerie/gallerie.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-list-gallerie',
  templateUrl: './list-gallerie.component.html',
  styleUrls: ['./list-gallerie.component.css']
})
export class ListGallerieComponent implements OnInit{

  declare gallerie : any []; // Tableau contenant les galeries
  declare form: FormGroup;  // Formulaire de création de la gallerie
  declare recettes : any ; // Tableau contenant les recettes
  @Input() idrecetteencours! : number; // Identifiant de la recette en cours

  constructor(
    private gallerieService : GallerieService,
    private router : Router,
    private formBuilder : FormBuilder,
    private recetteService: RecetteService,
  ){
  }
  ngOnInit(): void {
    // Initialisation du formulaire
    this.form = this.formBuilder.group({
      gallerie_id:  ['', Validators.required],
      id_recette:  [''],
	    gallerie_filename:  ['', Validators.required],
	    uid :  ['', Validators.required],

    })
     // Récupération des galeries existantes
    this.getGalleries();
     // Récupération de toutes les recettes
    this.recetteService.findAllRecettes().subscribe(
      data =>{
        // Stockage des recettes dans un tableau
          this.recettes = Object.values(data);
           // Tri des recettes par date décroissante
         this.recettes.sort((a: { date_recette: number; }, b: { date_recette: number; }) => (a.date_recette < b.date_recette ? 1 : -1))
        // Sélection de la première recette de la liste
         this.idrecetteencours=this.recettes[0].id_recette;
        // Stockage de l'identifiant de la recette en cours
          this.recetteService.setIdRecetteEncours( this.idrecetteencours);

        }
    )

  }
   // Fonction permettant de récupérer toutes les galeries existantes
  getGalleries() {
    return this.gallerieService.findAllGalleries().subscribe(
      (data=>{
        this.gallerie = data as any [];
      }
        )

    )
  }


}
