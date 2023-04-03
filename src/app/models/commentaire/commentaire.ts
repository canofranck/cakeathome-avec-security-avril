import { Recette } from "../recette/recette";
import { Utilisateur } from "../utilisateur/utilsateur";
export class Commentaire {

id_commentaire:number;
commentaire:string;
imagecommentaire:string;
notecommentaire:number;
datecommentaire:Date;
uid:number;
// utilisateur?: Utilisateur | null =null;
id_recette:number;
// recette?: Recette | null=null ;
constructor (){
this.id_commentaire=0;
this.commentaire="";
this.imagecommentaire="";
this.notecommentaire=0;
this.datecommentaire=new Date;
this.uid=0;
//  this.utilisateur=null;
 this.id_recette=0;
  // this.recette=null;
  }
}
