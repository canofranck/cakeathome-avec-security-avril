import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Gallerie } from 'src/app/models/gallerie/gallerie';
import { FileUploadServiceService } from 'src/app/services/fileUploadService/file-upload-service.service';
import { GallerieService } from 'src/app/services/gallerie/gallerie.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit {
  file!: File; // Fichier sélectionné par l'utilisateur valeur defini qui ne peut pas etre nul

  fileDetails!: any; // Détails du fichier sélectionné
  fileUris: Array<string> = []; // // Tableau des URL des fichiers enregistrés dans la galerie
  declare form: FormGroup;
  declare gallerie: any[]; // Tableau des galeries d'images
  declare recettes: any; // Tableau des recettes
  uid: number = 0;
  @Input() idrecetteencours!: number; // ID de la recette en cours

  constructor(
    private fileUploadService: FileUploadServiceService, // Service pour upload le fichier image
    private router: Router, // Service pour la navigation
    private formBuilder: FormBuilder, // Service pour la création de formulaire
    private gallerieService: GallerieService, // Service pour la gestion des galeries d'images
    private recetteService: RecetteService // Service pour la gestion des recettes
  ) {}

  ngOnInit(): void {
    // Récupération de toutes les recettes
    this.recetteService.findAllRecettes().subscribe((data) => {
      this.recettes = Object.values(data); // Récupération des recettes
      // Tri des recettes par date décroissante
      this.recettes.sort(
        (a: { daterecette: number }, b: { daterecette: number }) =>
          a.daterecette < b.daterecette ? 1 : -1
      );

      // Récupération de l'ID de la première recette et définition de l'ID de la recette en cours
      this.idrecetteencours = this.recettes[0].idrecette;

      this.idrecetteencours += 1;
      // Définition de l'ID de la recette en cours dans le service de gestion des recettes
      this.recetteService.setIdRecetteEncours(this.idrecetteencours);
    });
    const token = localStorage.getItem('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      const tokenPayload = jwtHelper.decodeToken(token);
      const username = tokenPayload.sub;
      const uid = tokenPayload.uid;

      this.uid = uid;
    }
    // Création du formulaire pour upload le fichier image
    this.form = this.formBuilder.group({
      gallerieid: ['', Validators.required], // Sélection obligatoire d'une galerie d'images
      idrecette: [this.idrecetteencours], // ID de la recette en cours
      galleriefilename: ['', Validators.required], // Nom de fichier obligatoire
      uid: ['', Validators.required], // ID de l'utilisateur pour upload le fichier
    });
    this.getGalleries();
  }

  selectFile(event: any) {
    this.file = event.target.files.item(0);
    this.uploadFile();
  }
  // envoi les informations de l image  à la BD
  uploadFile() {
    this.form.value.galleriefilename = this.file.name;
    this.form.value.idrecette = this.idrecetteencours;
    this.form.value.uid = this.uid;
    this.fileUploadService.upload(this.form.value).subscribe({
      next: (data) => {},
      error: (e) => {
        console.log(e);
      },
    });

    // envoi  l image dans le backend pour stockage

    this.fileUploadService.upload2(this.file).subscribe({
      next: (data) => {
        this.fileDetails = data;
        this.fileUris.push(this.fileDetails.fileUri);
        // alert("File Uploaded Successfully")
        // location.reload();
        this.gallerieService
          .findGallerieByName(this.file.name)
          .subscribe((data) => {
            this.gallerie.push(data as Gallerie);
          });
      },
      error: (e) => {
        console.log(e);
      },
    });
  }
  getGalleries() {
    return this.gallerieService.findAllGalleries().subscribe((data) => {
      this.gallerie = data as any[];
    });
  }
}
