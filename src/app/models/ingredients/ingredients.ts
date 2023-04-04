import { Recette } from "../recette/recette";

export class Ingredients {
  public idingredient:number;
  public idrecette:number;
  public quantiteingredient:string;


  public recette:Recette[];
  static idingredient: number;
  constructor (){
    this.idingredient=0;
    this.idrecette=0;
    this.quantiteingredient="";


    this.recette=[];
}
}
