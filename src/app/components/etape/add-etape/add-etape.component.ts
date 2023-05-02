import { Etape } from './../../../models/etape/etape';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EtapeService } from 'src/app/services/etape/etape.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-add-etape',
  templateUrl: './add-etape.component.html',
  styleUrls: ['./add-etape.component.css'],
})
export class AddEtapeComponent implements OnInit {
  declare formaddEtape: FormGroup; // déclaration d'une variable pour stocker un formulaire
  declare recettes: any; // déclaration d'une variable pour stocker les recettes
  @Input() idrecetteencours!: number; // variable en entrée, contient l'id de la recette en cours
  @Input() afficheretape!: boolean; // variable en entrée, pour savoir s'il faut afficher les étapes ou non
  @Output() // variable en sortie, pour cacher les étapes après création
  public cacheretape: EventEmitter<any> = new EventEmitter<any>();
  listeEtape: any[] = [];
  numeroEtape = 1;
  constructor(
    private etapeService: EtapeService, // service pour les étapes
    private recetteService: RecetteService, // service pour les recettes
    private formBuilder: FormBuilder, // constructeur de formulaire
    private router: Router
  ) {}
  ngOnInit(): void {
    // initialisation du formulaire
    this.formaddEtape = this.formBuilder.group({
      idetape: ['', Validators.required],
      numeroetape: [this.numeroEtape, Validators.required],
      instructionsetape: ['', Validators.required],
      // imageetape:['',Validators.required],
      idrecette: ['', Validators.required],
    });
    // Récupération des recettes
    this.recetteService.findAllRecettes().subscribe((data) => {
      // stockage des recettes dans une variable
      this.recettes = Object.values(data);
      // tri des recettes par date décroissante
      this.recettes.sort(
        (a: { daterecette: number }, b: { daterecette: number }) =>
          a.daterecette < b.daterecette ? 1 : -1
      );
      // Récupération de l'id de la recette en cours
      this.idrecetteencours = this.recettes[0].idrecette;
      // Stockage de l'id de la recette en cours dans le service des recettes
      this.recetteService.setIdRecetteEncours(this.idrecetteencours);
    });

  }
  create() {
    const formValues = this.formaddEtape.value;
    const etape = new Etape();
    // Récupération des valeurs du formulaire
    etape.numeroetape = this.formaddEtape.value.numeroetape;
    etape.instructionsetape = this.formaddEtape.value.instructionsetape;
    // etape.imageetape = this.formaddEtape.value.imageetape;
    etape.idrecette = this.idrecetteencours;
    this.listeEtape.push(etape);
    // Envoi de la requête de création d'une étape
    this.etapeService.saveEtape(etape).subscribe((response) => {
      // Réinitialisation du formulaire après création d'une étape
      this.formaddEtape.reset();
      this.numeroEtape++;
      this.formaddEtape.patchValue({numeroetape: this.numeroEtape});
    });
  }
  // methode pour cacher le composant etape
  cachertape() {
    this.cacheretape.emit({});
  }
}
