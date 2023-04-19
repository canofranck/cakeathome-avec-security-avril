import { Ingredients } from "../ingredients/ingredients";
import { Utilisateur } from "../utilisateur/utilsateur";

export class Recette {
   public idrecette:number;
   public titrerecette:string;
   public daterecette:Date;
   public descriptionrecette:string;
   public categorierecette: string;
   public niveaudifficulterecette:string;
   public tempspreparationrecette:string;
   public tempscuissonrecette:string;
   public tempstotalrecette:string;
   public nbpersonnerecette:string;
   public recettepremiumrecette:boolean;
   public nbvuerecette:number;
   public nblike:number;
   public notemoyenne:number;
   public uid:number;
   public listIngredient:[];
   public listGalerie:[];
   public listEtape:[];
   public listCommentaire:[];
   public  username?: string;

  //  public quantiteingredient : string;
  //  public idingredient :number;
//    public ingredients:Ingredients[];
// public quantiteingredient:string;
   constructor (){
    this.idrecette=0;
    this.titrerecette="";
    this.daterecette=new Date();
    this.descriptionrecette="";
    this.categorierecette="";
    this.niveaudifficulterecette="";
    this.tempspreparationrecette="";
    this.tempscuissonrecette="";
    this.tempstotalrecette="";
    this.nbpersonnerecette="";
    this.recettepremiumrecette=false;
    this.nbvuerecette=0;
    this.nblike=0;
    this.notemoyenne=0;
    this.uid=0;
    this.listIngredient=[];
    // this.quantiteingredient="";
    this.listGalerie=[];
    this.listEtape=[];
    this.listCommentaire=[];
    this.username="";
    // this.id_ingredient=0;
//     this.ingredients=[];
// this.quantiteingredient='';


   }

}
