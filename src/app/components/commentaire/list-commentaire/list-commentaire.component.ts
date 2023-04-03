import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';

@Component({
  selector: 'app-list-commentaire',
  templateUrl: './list-commentaire.component.html',
  styleUrls: ['./list-commentaire.component.css']
})
export class ListCommentaireComponent implements  OnInit {
  declare commentaire: any[];

  constructor(
    private commentaireService: CommentaireService,
    private router: Router,
    private route: ActivatedRoute
    )
     {}

     ngOnInit(): void {

      this.commentaireService.findAllCommentaire().subscribe(
        data => {
          console.log(data);
          this.commentaire =data as any ;

        }
      )
      if (this.route.snapshot.paramMap.get('id') != null) {

        this.remove();
      }
    }
    remove() {

      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.commentaireService.deleteCommentaire(id).subscribe(
        () => {

        }
      )
    }
  }



