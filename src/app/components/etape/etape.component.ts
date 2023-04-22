import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EtapeService } from 'src/app/services/etape/etape.service';
import { RecetteService } from 'src/app/services/recette/recette.service';

@Component({
  selector: 'app-etape',
  templateUrl: './etape.component.html',
  styleUrls: ['./etape.component.css'],
})
export class EtapeComponent implements OnInit {
  declare etape: any[];

  constructor(
    private etapeService: EtapeService,
    private recetteService: RecetteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEtapes();
  }

  getEtapes() {
    return this.etapeService.findAllEtapes().subscribe((data) => {
      this.etape = data as any[];
    });
  }

  deleteUser(id: number) {
    this.etapeService.deleteEtape(id).subscribe(() => {});
  }
}
