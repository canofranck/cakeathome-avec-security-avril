import { Ingredients } from "../ingredients/ingredients";
import { Recette } from "../recette/recette";

export class Recetteingredient {
  public id_recetteingredients!:number;
  public quantite;
  public id_recette!:number;
  public id_ingredient:number;
  public ingredients?:Ingredients | null = null; // a voir poue le supprimer
  public recettes?:Recette  | null =null; // a tester sans
  constructor (){
    this.id_recetteingredients=0;
    this.quantite= "";
    this.id_recette=0;
    this.id_ingredient=0;
    this.ingredients=null;
    this.recettes=null;
}
}
