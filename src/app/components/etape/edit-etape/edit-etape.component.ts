import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Etape } from 'src/app/models/etape/etape';

import { EtapeService } from 'src/app/services/etape/etape.service';

@Component({
  selector: 'app-edit-etape',
  templateUrl: './edit-etape.component.html',
  styleUrls: ['./edit-etape.component.css']
})
export class EditEtapeComponent  implements OnInit {

  declare editetapeForm: FormGroup;
  etape: Etape = new Etape();

  recette: any ={};
  constructor(
  private etapeService : EtapeService,
  private router : Router,
  private route: ActivatedRoute,
  private formBuilder: FormBuilder,


  ) {
   }
  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.editetapeForm = this.formBuilder.group({
    id_etape: ['',Validators.required],

    numero_etape: ['',Validators.required],
    instructions_etape: ['',Validators.required],
    image_etape :['',Validators.required],
    id_recette: ['',Validators.required],

  })
  //récupere le produit via l'id
  this.etapeService.editEtape(id).subscribe(
    (data :any) => {
      console.log(data)
      //complete le form avec le produit récupéré
      this.editetapeForm.patchValue({
         id_etape: data.id_etape,
         id_recette: data.recette.id_recette,
         numero_etape: data.numero_etape,
         instructions_etape: data.instructions_etape,
         image_etape: data.image_etape,
      });
      this.recette=data.recette;
    }
  )
  }
  update() {
    if (this.editetapeForm.valid) {
      let data = this.editetapeForm.value;
      data.recette= this.recette;
      console.log(this.editetapeForm.value);

      this.etapeService.updateEtape(data).subscribe(
        () => {
      //  this.router.navigate(['/etape'])

        }
      )
    }
  }
  }
