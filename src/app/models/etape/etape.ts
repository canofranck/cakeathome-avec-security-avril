import { Recette } from "../recette/recette";

export class Etape {
  public id_etape:number;
  public numero_etape: number;
  public instructions_etape: string;
  public image_etape : string ;
  public id_recette:number;
  public recette?: Recette | null=null ;
  constructor (){
    this.id_etape=0;
    this.numero_etape=0;
    this.instructions_etape= "";
    this.image_etape="";
    this.id_recette=0;
    this.recette=null;
}
}
