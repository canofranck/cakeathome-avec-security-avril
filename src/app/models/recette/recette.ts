import { Ingredients } from "../ingredients/ingredients";
import { Utilisateur } from "../utilisateur/utilsateur";

export class Recette {
   public id_recette:number;
   public titre_recette:string;
   public date_recette:Date;
   public description_recette:string;
   public categorie_recette: string;
   public niveaudifficulte_recette:string;
   public tempspreparation_recette:string;
   public tempscuisson_recette:string;
   public tempstotal_recette:string;
   public nbpersonne_recette:string;
   public recettepremium_recette:boolean;
   public nbvuerecette:number;
   public nblike:number;
   public notemoyenne:number;
   public uid:number;
   public listIngredient:[];
   public listGalerie:[];
   public listEtape:[];
   public listCommentaire:[];
  //  public quantiteingredient : string;
  //  public id_ingredient :number;
//    public ingredients:Ingredients[];
// public quantiteingredient:string;
   constructor (){
    this.id_recette=0;
    this.titre_recette="";
    this.date_recette=new Date();
    this.description_recette="";
    this.categorie_recette="";
    this.niveaudifficulte_recette="";
    this.tempspreparation_recette="";
    this.tempscuisson_recette="";
    this.tempstotal_recette="";
    this.nbpersonne_recette="";
    this.recettepremium_recette=false;
    this.nbvuerecette=0;
    this.nblike=0;
    this.notemoyenne=0;
    this.uid=0;
    this.listIngredient=[];
    // this.quantiteingredient="";
    this.listGalerie=[];
    this.listEtape=[];
    this.listCommentaire=[];
    // this.id_ingredient=0;
//     this.ingredients=[];
// this.quantiteingredient='';


   }

}
