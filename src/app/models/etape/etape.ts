import { Recette } from "../recette/recette";

export class Etape {
  public idetape:number;
  public numeroetape: number;
  public instructionsetape: string;
  public imageetape : string ;
  public idrecette:number;
  public recette?: Recette | null=null ;
  constructor (){
    this.idetape=0;
    this.numeroetape=0;
    this.instructionsetape= "";
    this.imageetape="";
    this.idrecette=0;
    this.recette=null;
}
}
