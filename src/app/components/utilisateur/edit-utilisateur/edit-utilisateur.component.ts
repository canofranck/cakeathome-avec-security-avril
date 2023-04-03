import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Utilisateur } from "src/app/models/utilisateur/utilsateur";
import { UtilisateurService } from "src/app/services/utilisateur/utilisateur.service";



@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
  styleUrls: ['./edit-utilisateur.component.css']
})
export class EditUtilisateurComponent implements OnInit {

  declare editutilisateurForm: FormGroup;
  declare utilisateur: Utilisateur;
  constructor(
    private utilisateurService : UtilisateurService,
    private router : Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
  ) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.editutilisateurForm = this.formBuilder.group({
      uid: [''],
      pseudo_utilisateur: ['',Validators.required],
      password_utilisateur: ['',Validators.required],
      genre :['',Validators.required],
      email_utilisateur: ['',Validators.required],
      dateInscription_utilisateur: ['',Validators.required],
      ville_utilisateur: ['',Validators.required],
      mesfavoris_utilisateur: ['',Validators.required],
      listRecette: [[]],

    })
    //récupere le produit via l'id
    this.utilisateurService.editUser(id).subscribe(
      data => {
        console.log(data)
        //complete le form avec le produit récupéré
        this.editutilisateurForm.setValue(data);
      }
    )
  }
  update() {

    if (this.editutilisateurForm.valid) {

      console.log(this.editutilisateurForm.value);

      this.utilisateurService.updateUser(this.editutilisateurForm.value).subscribe(
        () => {
          this.router.navigate(['/utilisateur'])

        }
      )
    }
  }

}
