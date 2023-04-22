import { Recette } from "../recette/recette";

export class Commentaire {

idcommentaire:number;
commentaire:string;
notecommentaire:number;
datecommentaire:Date;
uid:number;
idrecette:number;

constructor (){
this.idcommentaire=0;
this.commentaire="";
this.notecommentaire=0;
this.datecommentaire=new Date;
this.uid=0;
this.idrecette=0;
  }
}
