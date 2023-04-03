import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbonnementService } from 'src/app/services/abonnement/abonnement.service';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.css']
})
export class AbonnementComponent  implements  OnInit {
  declare abonnement: any[];

  constructor(
    private abonnementService: AbonnementService,
    private router: Router,
    private route: ActivatedRoute
    )
     {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    return this.abonnementService.findAllUsers().subscribe(
      data => {
        console.log(data);
        this.abonnement = data as any[];
      }
    )
  }

  deleteUser(id: number) {

    this.abonnementService.deleteUser(id).subscribe
      (
        () => {

        }
      )


  }
}

