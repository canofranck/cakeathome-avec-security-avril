import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EtapeService } from 'src/app/services/etape/etape.service';

@Component({
  selector: 'app-list-etape',
  templateUrl: './list-etape.component.html',
  styleUrls: ['./list-etape.component.css']
})
export class ListEtapeComponent implements  OnInit {
  declare etape: any[];

  constructor(
    private etapeService: EtapeService,
    private router: Router,
    private route: ActivatedRoute
    )
     {}

     ngOnInit(): void {

      this.etapeService.findAllEtapes().subscribe(
        data => {
          console.log(data);
          this.etape =data  as any[]

        }
      )
      if (this.route.snapshot.paramMap.get('id') != null) {

        this.remove();
        this.router.navigate(['/etape'])
      }
    }
    remove() {

      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.etapeService.deleteEtape(id).subscribe(
        () => {

        }
      )
    }
  }
