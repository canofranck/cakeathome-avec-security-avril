import { Recette } from "../recette/recette";
// import { Utilisateur } from "../utilisateur/utilsateur";
export class Commentaire {

idcommentaire:number;
commentaire:string;
notecommentaire:number;
datecommentaire:Date;
uid:number;
// utilisateur?: Utilisateur | null =null;
idrecette:number;
// recette?: Recette | null=null ;
constructor (){
this.idcommentaire=0;
this.commentaire="";

this.notecommentaire=0;
this.datecommentaire=new Date;
this.uid=0;
//  this.utilisateur=null;
 this.idrecette=0;
  // this.recette=null;
  }
}
