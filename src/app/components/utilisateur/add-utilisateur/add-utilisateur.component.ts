import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UtilisateurService } from "src/app/services/utilisateur/utilisateur.service";

@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent  implements OnInit{
  declare form : FormGroup;
  constructor(
    private utilisateurService : UtilisateurService,
    private router : Router,
    private formBuilder:FormBuilder,
  ){

  }
 ngOnInit(): void {
    this.form= this.formBuilder.group({
      uid: ['',Validators.required],
      pseudo_utilisateur: ['',Validators.required],
      password_utilisateur: ['',Validators.required],
      genre :['',Validators.required],
      email_utilisateur: ['',Validators.required],
      dateInscription_utilisateur: ['',Validators.required],
      ville_utilisateur: ['',Validators.required],
      mesfavoris_utilisateur: ['',Validators.required],

    })
}
create(){
  console.log(this.form.value);

  this.utilisateurService.saveUser(this.form.value).subscribe(

      () =>{
        this.router.navigate(['/utilisateur'])

       }

  )
}
}

