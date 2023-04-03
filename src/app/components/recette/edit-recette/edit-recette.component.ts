import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ingredients } from 'src/app/models/ingredients/ingredients';
import { Recette } from 'src/app/models/recette/recette';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-edit-recette',
  templateUrl: './edit-recette.component.html',
  styleUrls: ['./edit-recette.component.css']
})
export class EditRecetteComponent implements OnInit {

  declare formeditRecette: FormGroup;
  declare recette: Recette;
  declare ingredient : Ingredients;
  constructor(
    private recetteService : RecetteService,
    private router : Router,
    private route: ActivatedRoute,
    private formBuilder:FormBuilder,
  ) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.formeditRecette = this.formBuilder.group({
    titre_recette:['',Validators.required],
    date_recette:['',Validators.required],
    description_recette:['',Validators.required],
    categorie_recette:['',Validators.required],
    niveaudifficulte_recette:['',Validators.required],
    tempspreparation_recette:['',Validators.required],
    tempscuisson_recette:['',Validators.required],
    tempstotal_recette:['',Validators.required],
    nbpersonne_recette:['',Validators.required],
    recettepremium_recette:['',Validators.required],
    uid:['',Validators.required],
    id_recette:['',Validators.required],
    listIngredient: [[]],
    })
    //récupere le produit via l'id
    this.recetteService.editRecette(id).subscribe(
      data => {
        console.log(data)
        //complete le form avec le produit récupéré
        this.formeditRecette.setValue(data);
      }
    )
  }
  update() {

    if (this.formeditRecette.valid) {

      console.log(this.formeditRecette.value);

      this.recetteService.updateRecette(this.formeditRecette.value).subscribe(
        () => {
          this.router.navigate(['/postrecette'])

        }
      )
    }
  }

}
