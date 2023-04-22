import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Abonnement } from 'src/app/models/abonnement/abonnement';
import { AbonnementService } from 'src/app/services/abonnement/abonnement.service';
import { UserService } from './../../../services/user/user.service';
@Component({
  selector: 'app-edit-abonnement',
  templateUrl: './edit-abonnement.component.html',
  styleUrls: ['./edit-abonnement.component.css'],
})
export class EditAbonnementComponent implements OnInit {
  declare editabonnementForm: FormGroup;
  abonnement: Abonnement = new Abonnement();
  utilisateur: any = {};
  constructor(
    private abonnementService: AbonnementService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.editabonnementForm = this.formBuilder.group({
      idabonnement: ['', Validators.required],

      abonnementpris: ['', Validators.required],
      abonnementdatedebut: ['', Validators.required],
      abonnementduree: ['', Validators.required],
      uid: ['', Validators.required],
    });
    //récupere l abonnement via l'id
    this.abonnementService.editUser(id).subscribe((data: any) => {
      //complete le form avec l abonnement récupéré
      this.editabonnementForm.patchValue({
        idabonnement: data.idabonnement,
        uid: data.utilisateur.uid,
        abonnementpris: data.abonnementpris,
        abonnementdatedebut: data.abonnementdatedebut,
        abonnementduree: data.abonnementduree,
      });
      this.utilisateur = data.utilisateur;
    });
  }
  update() {
    if (this.editabonnementForm.valid) {
      let data = this.editabonnementForm.value;
      data.utilisateur = this.utilisateur;
      this.abonnementService.updateUser(data).subscribe(() => {
        this.router.navigate(['/listabonnement']);
      });
    }
  }
}
