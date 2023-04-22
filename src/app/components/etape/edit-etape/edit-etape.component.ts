import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Etape } from 'src/app/models/etape/etape';

import { EtapeService } from 'src/app/services/etape/etape.service';

@Component({
  selector: 'app-edit-etape',
  templateUrl: './edit-etape.component.html',
  styleUrls: ['./edit-etape.component.css'],
})
export class EditEtapeComponent implements OnInit {
  declare editetapeForm: FormGroup;
  // Etape = new Etape();

  recette: any = [];
  constructor(
    private etapeService: EtapeService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.editetapeForm = this.formBuilder.group({
      idetape: ['', Validators.required],
      numeroetape: ['', Validators.required],
      instructionsetape: ['', Validators.required],
      idrecette: ['', Validators.required],
    });
    //récupere l etape via l'id
    this.etapeService.editEtape(id).subscribe((data) => {
      //complete le form avec l etape récupéré
      this.editetapeForm.setValue(data);
    });
  }
  update() {
    if (this.editetapeForm.valid) {
      let data = this.editetapeForm.value;

      this.etapeService.updateEtape(data).subscribe(() => {
        this.router.navigate(['/etape']);
      });
    }
  }
}
