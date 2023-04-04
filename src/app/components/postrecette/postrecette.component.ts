

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecetteService } from 'src/app/services/recette/recette.service';
import { Recette } from 'src/app/models/recette/recette';
import { concatMap, delay } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-postrecette',
  templateUrl: './postrecette.component.html',
  styleUrls: ['./postrecette.component.css']
})

export class PostrecetteComponent implements OnInit{
  declare form: FormGroup;
  declare ingredient : any ;
  declare formaddIngredient : FormGroup;
  addingre=false;
  cachebuttoningredient=true;
  cachebuttonetape=true;
  afficheretape=false;
  declare recettes : any ;
  idrecetteencours!: number;
  declare form2:  FormGroup;
  declare recette: Recette;
  declare recette2: Recette
  uid:number=0;
  // @Input() idrecetteencours! : number;



  constructor (
    private recetteService: RecetteService,
    private formBuilder: FormBuilder,
    private router : Router,
    private ingredientService : IngredientsService,
    private notifier: NotifierService,
  ){}
    ngOnInit(): void {

      this.gettoken();
        this.formaddIngredient = this.formBuilder.group({
          // idingredient:['',Validators.required],
          idrecette:['',Validators.required],
          quantiteingredient:['',Validators.required],
        })

        this.form = this.formBuilder.group({
          idrecette :[''],
          titrerecette: [''],
          daterecette:[new Date()],
          descriptionrecette:[''],
          categorierecette:[''],
          niveaudifficulterecette:[''],
          tempspreparationrecette:[''],
          tempscuissonrecette:[''],
          tempstotalrecette:[''],
          nbpersonnerecette:[''],
          recettepremiumrecette:[''],
          uid:[this.uid],
        })
        // console.table(this.form.value)

  }
  create(){
    // this.recetteService.getIdRecetteEncours();
    console.log(this.idrecetteencours)


     console.log("final recette"+this.uid);
    const formValues = this.form.value;
    const recette2 = new Recette();
    //  recette2.idrecette=this.idrecetteencours;
       recette2.titrerecette=this.form.value.titrerecette;
        recette2.daterecette=new Date();
         recette2. descriptionrecette=this.form.value.descriptionrecette;
          // recette2.categorierecette=this.form.value.categorierecette;
        // Vérifier que l'élément de formulaire "categorierecette" existe avant d'utiliser la méthode "get()"
        if (formValues && formValues.categorierecette) {
          recette2.categorierecette = formValues.categorierecette;
        }


          recette2.niveaudifficulterecette=this.form.value.niveaudifficulterecette;
          recette2.tempspreparationrecette=this.form.value.tempspreparationrecette;
          recette2.tempscuissonrecette=this.form.value.tempscuissonrecette;
          recette2.tempstotalrecette=this.form.value.tempstotalrecette;
          recette2.nbpersonnerecette=this.form.value.nbpersonnerecette;
          recette2.recettepremiumrecette=this.form.value.recettepremiumrecette;
          // recette2.uid= this.uid;
          recette2.idrecette=this.idrecetteencours;
    console.log(this.form.value);
    console.log(this.idrecetteencours)
     this.recetteService.updateRecette2(this.form.value,this.idrecetteencours).subscribe(
      () =>{
        this.notifier.notify('success', 'Recette enregistrer avec succes ');
         this.router.navigate(['/home']);
      }
     );
  }
  affingre() {
    this.addingre=true;
    this.cachebuttoningredient=false;
    console.log("affiche ingredient"+this.addingre);

        const recette = new Recette();
        recette.daterecette = new Date();
        recette.titrerecette='';
        recette. descriptionrecette='';
          recette.categorierecette='';
          recette.niveaudifficulterecette='';
          recette.tempspreparationrecette='';
          recette.tempscuissonrecette='';
          recette.tempstotalrecette='';
          recette.nbpersonnerecette='';
          recette.recettepremiumrecette=false;
           recette.uid= this.uid;
console.log(this.recette);

        this.recetteService.saveRecette(recette).pipe(
          concatMap(() => this.recetteService.findAllRecettes())
        ).subscribe(
          data =>{
            console.log(data);
            this.recettes = Object.values(data);
            this.recettes.sort((a: { daterecette: number; }, b: { daterecette: number; }) => (a.daterecette < b.daterecette ? 1 : -1))
            console.log(this.recettes);
            this.idrecetteencours=this.recettes[0].idrecette;
            if ( this.recettes[0].uid=this.uid){
                          console.log(" id recette avant le set"+this.idrecetteencours);
            this.recetteService.setIdRecetteEncours( this.idrecetteencours);
            console.log(" id recette en cours dans affiche ingredient"+this.idrecetteencours);
            }
          }
        );


  }

  cacheringr(){

  this.addingre=false;

  }
  affetapes() {
    this.afficheretape=true;
    this.cachebuttonetape=false;
    console.log(this.afficheretape);
  }
  cachetape(){
    this.afficheretape=false;
  }
  gettoken(){
  const token = localStorage.getItem('token');
  if (token) {
    const jwtHelper = new JwtHelperService();
    const tokenPayload = jwtHelper.decodeToken(token);
    const username = tokenPayload.sub;
    const uid =tokenPayload.uid
    console.log(" ici le pseudo du token  " +username);
    console.log(" ici l id utilisateur du token  " +uid);
    this.uid=uid
    console.log("uid veant du token : "+uid);

  }
}
  }




