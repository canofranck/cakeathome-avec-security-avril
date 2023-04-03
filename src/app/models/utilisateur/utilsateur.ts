import { Abonnement } from "../abonnement/abonnement";

export class Utilisateur {
  public id_utilisateur: number;
  public pseudo_utilisateur: string;
  public password_utilisateur: string;
  public genre: string;
  public email_utilisateur: string;
  public dateInscription_utilisateur:Date;
  public ville_utilisateur: string;
  public mesfavoris_utilisateur: string;
  public listRecette:[];
  public abonnement?:Abonnement | null = null;
  constructor() {
    this.id_utilisateur = 0;
    this.pseudo_utilisateur = "";
    this.password_utilisateur = "";
    this.genre = "";
    this.email_utilisateur = "";
    this.dateInscription_utilisateur =new Date();
    this.ville_utilisateur ="";
    this.mesfavoris_utilisateur = "";
    this.listRecette=[];
    this.abonnement=null;
  }
}
