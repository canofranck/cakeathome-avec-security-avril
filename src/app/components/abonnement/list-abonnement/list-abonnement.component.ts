import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbonnementService } from 'src/app/services/abonnement/abonnement.service';

@Component({
  selector: 'app-list-abonnement',
  templateUrl: './list-abonnement.component.html',
  styleUrls: ['./list-abonnement.component.css']
})
export class ListAbonnementComponent implements  OnInit {
  declare abonnement: any;

  constructor(
    private abonnementService: AbonnementService,
    private router: Router,
    private route: ActivatedRoute
    )
     {}

  ngOnInit(): void {

    this.abonnementService.findAllUsers().subscribe(
      data => {
        console.log(data);
        this.abonnement= data as any ;

      }
    )
    if (this.route.snapshot.paramMap.get('id') != null) {

      this.remove();
    }
  }
  remove() {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.abonnementService.deleteUser(id).subscribe(
      () => {

      }
    )
  }
}
