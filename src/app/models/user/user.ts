export class User {

    public uid: number; // id de la base de données DB

	public userId: string; // id de l utilisateur
	public  firstname : string;
	public  lastname: string;
	public  username: string;
  public currentUsername: string;
	public  email: string;
	public  password: string;
  public city: string;
	public  address : string;
  public gender:string;
	public  profileImageURL : string;
	public  lastLoginDate: Date;
	public  lastLoginDateDisplay : Date;
	public  joinDate : Date;
	public  role: string; // ROLE_USER(read,edit), ROLE_ADMIN(delete)
	public  authorities : string[]; // [] = tableau de String // Authorities = permissions (read, edit, delete)
	public  active : boolean;// Pour activer les rôles
	public  notLocked : boolean;

    constructor(){
        this.uid = 0,
        this.userId = '',

        this.firstname = '',
        this.lastname = '',
        this.username = '',
        this.currentUsername = '',

        this.email = '',
        this.password = '',
        this.city="",
        this.address = '',
        this.profileImageURL = '',
        this.gender='',
        this.lastLoginDate = new Date(),
        this.lastLoginDateDisplay = new Date(),
        this.joinDate = new Date(),

        this.role = '',

        this.authorities = [],

        this.active = false,
        this.notLocked = false;


      }


}
