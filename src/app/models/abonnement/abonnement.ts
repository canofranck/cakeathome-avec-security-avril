

export class Abonnement {
  public idabonnement:number;
	public abonnementpris: boolean;
  public abonnementdatedebut:Date;
	public abonnementduree:number;
  public uid:number;


  constructor (){
  this.idabonnement=0;
  this.abonnementpris=false;
  this.abonnementdatedebut=new Date;
  this.abonnementduree=0;
  this.uid=0;


  }
}


