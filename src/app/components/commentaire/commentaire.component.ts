import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentaireService } from 'src/app/services/commentaire/commentaire.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css'],
})
export class CommentaireComponent implements OnInit {
  declare commentaire: any[]; // On déclare un tableau vide pour stocker les commentaires

  constructor(
    private commentaireService: CommentaireService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getCommentaires(); // On récupère les commentaires
  }
  // Cette méthode utilise le service CommentaireService pour récupérer tous les commentaires
  getCommentaires() {
    // On appelle la méthode findAllCommentaire() du service et on s'abonne à l'observable qu'elle retourne
    // Lorsque les données sont récupérées, elles sont stockées dans le tableau commentaire
    return this.commentaireService.findAllCommentaire().subscribe((data) => {
      this.commentaire = data as any[];
    });
  }
  // Cette méthode utilise le service CommentaireService pour supprimer un commentaire à partir de son identifiant
  deleteCommentaire(id: number) {
    // On appelle la méthode deleteCommentaire() du service et on s'abonne à l'observable qu'elle retourne
    this.commentaireService.deleteCommentaire(id).subscribe(() => {
      // Lorsque la suppression est effectuée, on peut effectuer une action (ici, ne rien faire)
    });
  }
}
