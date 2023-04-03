import { Recette } from "../recette/recette";

export class Ingredients {
  public id_ingredient:number;
  public id_recette:number;
  public quantiteingredient:string;


  public recette:Recette[];
  static id_ingredient: number;
  constructor (){
    this.id_ingredient=0;
    this.id_recette=0;
    this.quantiteingredient="";


    this.recette=[];
}
}
