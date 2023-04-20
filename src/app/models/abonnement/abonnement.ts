

export class Abonnement {
  public idabonnement:number;
	public abonnementpris: boolean;
  public abonnementdatedebut:Date;
	public abonnementduree:number;
  public uid:number;
  // public utilisateur?: Utilisateur | null =null

  constructor (){
  this.idabonnement=0;
  this.abonnementpris=false;
  this.abonnementdatedebut=new Date;
  this.abonnementduree=0;
  this.uid=0;
  // this.utilisateur=null;

  }
}


