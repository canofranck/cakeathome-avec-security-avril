import { Etape } from './../../../models/etape/etape';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtapeService } from 'src/app/services/etape/etape.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-add-etape',
  templateUrl: './add-etape.component.html',
  styleUrls: ['./add-etape.component.css']
})
export class AddEtapeComponent implements OnInit{
  declare formaddEtape: FormGroup; // déclaration d'une variable pour stocker un formulaire
  declare recettes : any ;  // déclaration d'une variable pour stocker les recettes
  @Input() idrecetteencours! : number; // variable en entrée, contient l'id de la recette en cours
  @Input()  afficheretape!: boolean; // variable en entrée, pour savoir s'il faut afficher les étapes ou non
  @Output() // variable en sortie, pour cacher les étapes après création
   public   cacheretape:EventEmitter<any> =new EventEmitter<any>();
   listeEtape: any[] = [];
  constructor (
    private etapeService: EtapeService, // service pour les étapes
    private recetteService : RecetteService, // service pour les recettes
    private formBuilder: FormBuilder,  // constructeur de formulaire
    private router : Router,

  ){}
    ngOnInit(): void {
      // initialisation du formulaire
        this.formaddEtape = this.formBuilder.group({
          id_etape:['',Validators.required],
          numero_etape:['',Validators.required],
          instructions_etape:['',Validators.required],
          // image_etape:['',Validators.required],
          id_recette:['',Validators.required],

        })
        // Récupération des recettes
        this.recetteService.findAllRecettes().subscribe(
          data =>{
            // stockage des recettes dans une variable
              this.recettes = Object.values(data);
               // tri des recettes par date décroissante
             this.recettes.sort((a: { date_recette: number; }, b: { date_recette: number; }) => (a.date_recette < b.date_recette ? 1 : -1))
              // Récupération de l'id de la recette en cours
             this.idrecetteencours=this.recettes[0].id_recette;
          // Stockage de l'id de la recette en cours dans le service des recettes
              this.recetteService.setIdRecetteEncours( this.idrecetteencours);

            }
        )
  }
  create(){

    const formValues = this.formaddEtape.value;
    const etape = new Etape();
    // Récupération des valeurs du formulaire
      etape.numero_etape = this.formaddEtape.value.numero_etape;
     etape.instructions_etape =  this.formaddEtape.value.instructions_etape;
      // etape.image_etape = this.formaddEtape.value.image_etape;
      etape.id_recette=this.idrecetteencours;
      this.listeEtape.push(etape);
      // Envoi de la requête de création d'une étape
      this.etapeService.saveEtape(etape).subscribe((response) => {
       // Réinitialisation du formulaire après création d'une étape
          this.formaddEtape.reset();


       });


  }
  // methode pour cacher le composant etape
  cachertape(){

    this.cacheretape.emit({});
  }
  }
