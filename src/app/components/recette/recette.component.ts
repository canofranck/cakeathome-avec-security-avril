import { UserService } from './../../services/user/user.service';
import { Ingredients } from './../../models/ingredients/ingredients';
import { Recette } from './../../models/recette/recette';
import { CommentaireService } from './../../services/commentaire/commentaire.service';
import { Commentaire } from './../../models/commentaire/commentaire';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RecetteService } from "src/app/services/recette/recette.service";
import { ListIngredientComponent } from "../ingredients/list-ingredient/list-ingredient.component";
import { GallerieService } from 'src/app/services/gallerie/gallerie.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import {  EventEmitter, Output } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur/utilsateur';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/models/user/user';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-recette',
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.css']
})
 export class RecetteComponent implements  OnInit{
 declare formaddCommentaire: FormGroup;
 declare form : FormGroup;
 declare idrecetteencours : number;
declare affiche : any[];
declare recetteSelectionnee : Recette;
  declare recettes : any [];
  public listIngredient: { idingredient: number; quantiteingredient: string; }[]=[];
  public listEtape: { idetape: number; idrecette : number;numeroetape : number; instructionsetape: string;imageetape:string  }[]=[];
  public listGalerie : { idgallerie: number, idrecette : number,galleriefilename : string, uid: number}[]= [];
  public  list: any[] = [];
 public  affichetape: any[] = [];
 declare commentaire:Commentaire;
 declare gallerie : any [];
 public  affichegallerie: any[] = [];

  public recette!: Recette;
  likesCount = 0;
  formeditRecette: any;
  declare commentaireaffiche: any[];

  currentRate: number= 0;
  public moyenne:number = 0;
  declare idrecetteselectionner:number;
public usernamerecette: string | undefined;

  public commentairesRecette: any[]=[];
uid:number=0;
  @Output() maNote = new EventEmitter<number>()
  constructor (private recetteService : RecetteService,
    private router : Router,
    private commentaireserivce: CommentaireService,
    private formBuilder: FormBuilder,
    private gallerieService : GallerieService,
    private route: ActivatedRoute,
    private userService:UserService,
    private notifierService: NotifierService,
    ){

}
ngOnInit(): void {
   this.getRecettes();
  this.formaddCommentaire = this.formBuilder.group({
    idcommentaire:['',Validators.required],
    commentaire:['',Validators.required],
    imagecommentaire:['',Validators.required],
    notecommentaire:['',Validators.required],
    datecommentaire:['',Validators.required],
    uid:['',Validators.required],
    idrecette:['',Validators.required],
    notemoyenne:[''],

    });

    this.notifierService.notify('success', 'La recette a été chargé');
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.idrecetteselectionner = +id;
      console.log(id);
      this.recetteService.editRecette(this.idrecetteselectionner).subscribe(
        data => {
          console.log(data)

          this.recette = data as Recette;
          console.log(this.recette.nbvuerecette);
          this.recette.nbvuerecette += 1;
          console.log(this.recette.nbvuerecette);
          console.log(this.recette);
          this.likesCount=this.recette.nblike;
          this.recetteService.updateRecette(this.recette).subscribe(
            () => {


            }
          )
        }
      )

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

    this.commentaireserivce.findAllCommentaire().subscribe(
      data => {
        console.log(data);
        this.commentaireaffiche = data as any;
        this.commentaireaffiche.forEach(commentaire => {
          this.userService.getuser(commentaire.uid).subscribe(user => {
            commentaire.username = user.username;
          });
        });
        this.calculerNoteMoyenne();
      }
    )




}
calculerNoteMoyenne() {
  let commentairesRecette = this.commentaireaffiche.filter(commentaire => commentaire.idrecette === this.idrecetteselectionner);
  let totalNotes = commentairesRecette.reduce((sum, commentaire) => sum + commentaire.notecommentaire, 0);
this.commentairesRecette=commentairesRecette
  this.moyenne = totalNotes / commentairesRecette.length;
  console.log(this.moyenne);
  this.recette.notemoyenne=this.moyenne;
  this.recetteService.updateRecette(this.recette).subscribe(
    () => {


    }
  )
}

onRateChange(rate: number) {
  this.currentRate = rate;
  this.maNote.emit(this.currentRate);


}




getRecettes() {
  this.recetteService.findAllRecettes().subscribe(
    data =>{
         this.recettes = data as any[];
        this.getRecetteById(this.idrecetteselectionner);

    }
  );

}


create() {

  const formValues = this.formaddCommentaire.value;

  const commentairepost = new Commentaire();

  commentairepost.commentaire=this.formaddCommentaire.value.commentaire;
  commentairepost.datecommentaire=new Date();
  commentairepost.notecommentaire=this.currentRate;
  commentairepost.idrecette= this.idrecetteselectionner;
  commentairepost.uid=this.uid;

  // console.log(this.formaddCommentaire.value);
  // console.log(commentairepost)

   this.commentaireserivce.saveCommentaire(commentairepost).subscribe(
    () =>{

      // this.router.navigate(['postrecette']);
    }
   );
   this.commentaireaffiche.push(commentairepost);
   this.formaddCommentaire.reset();
   this.currentRate = 0;
  this.calculerNoteMoyenne()



}
getRecetteById(idRecette: number) {
  const recetteSelectionnee = this.recettes.find(recette => recette.idrecette === idRecette);
  // console.table(recetteSelectionnee);
  // console.table(recetteSelectionnee.listIngredient);
   console.table(recetteSelectionnee.listEtape);

  this.recetteSelectionnee = recetteSelectionnee;
  this.listIngredient = this.convertToList(recetteSelectionnee.listIngredient);
  this.listEtape=this.convertToListetape(recetteSelectionnee.listEtape);
 this.listGalerie=this.convertToListgalerie(recetteSelectionnee.listGalerie);


 this.userService.getuser(this.recetteSelectionnee.uid).subscribe(userrecette => {
  console.log(userrecette);
   console.log("Le créateur de la recette est " + userrecette.username);
   this.usernamerecette= userrecette.username;;
 });

//  const uidrecetteselectionner=this.userService.getuser(this.recetteSelectionnee.uid)
//  const usernamerecetteselectionner =uidrecetteselectionner//Object.values(uidrecetteselectionner);
//  console.log("id Utilisateur de la recette selectionner   "+usernamerecetteselectionner);
  // console.table(this.listIngredient);
  // console.table(this.listEtape);
  // console.table( this.list)
  // console.table (this.affichetape)
}
convertToList(listIngredient: {idingredient: number, quantiteingredient: string}[]): any[] {

  for(let i = 0; i < listIngredient.length; i++) {
    let ingredient = {idingredient: listIngredient[i].idingredient, quantiteingredient: listIngredient[i].quantiteingredient};
    this.list.push(ingredient);
  }
  return this.list;
}
convertToListetape(listEtape: { idetape: number, idrecette : number,numeroetape : number, instructionsetape: string,imageetape:string}[]): any[] {

  for(let i = 0; i < listEtape.length; i++) {
    let etape = {idetape: listEtape[i].idetape,  idrecette : listEtape[i].idrecette ,numeroetape: listEtape[i].numeroetape,instructionsetape:listEtape[i].instructionsetape ,imageetape:listEtape[i].imageetape};
    this.affichetape.push(etape);
  }
  return this.affichetape;
}
convertToListgalerie(listGalerie: { idgallerie: number, idrecette : number,galleriefilename : string, uid: number}[]): any[] {

  for(let i = 0; i <listGalerie.length; i++) {
    let gallerie = {idgallerie: listGalerie[i].idgallerie,  idrecette : listGalerie[i].idrecette, galleriefilename: listGalerie[i].galleriefilename, uid:listGalerie[i]. uid};
    this.affichegallerie.push(gallerie);
  }
  return this.affichegallerie;
}
incrementLikes() {
  this.likesCount++;
  this.recette.nblike=this.likesCount;
  this.recetteService.updateRecette(this.recette).subscribe(
    () => {


    }
  )
}
}


