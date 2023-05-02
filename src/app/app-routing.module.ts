import { RecettebynoteComponent } from './components/recettebynote/recettebynote.component';
import { RecetteparcategorieComponent } from './components/recetteparcategorie/recetteparcategorie.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AbonnementComponent } from "./components/abonnement/abonnement.component";
import { AddAbonnementComponent } from "./components/abonnement/add-abonnement/add-abonnement.component";
import { EditAbonnementComponent } from "./components/abonnement/edit-abonnement/edit-abonnement.component";
import { ListAbonnementComponent } from "./components/abonnement/list-abonnement/list-abonnement.component";
import { AddCommentaireComponent } from "./components/commentaire/add-commentaire/add-commentaire.component";
import { CommentaireComponent } from "./components/commentaire/commentaire.component";
import { EditCommentaireComponent } from "./components/commentaire/edit-commentaire/edit-commentaire.component";
import { ListCommentaireComponent } from "./components/commentaire/list-commentaire/list-commentaire.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AddEtapeComponent } from "./components/etape/add-etape/add-etape.component";
import { EditEtapeComponent } from "./components/etape/edit-etape/edit-etape.component";
import { EtapeComponent } from "./components/etape/etape.component";
import { ListEtapeComponent } from "./components/etape/list-etape/list-etape.component";
import { HomeComponent } from "./components/home/home.component";
import { AddIngredientComponent } from "./components/ingredients/add-ingredient/add-ingredient.component";
import { EditIngredientComponent } from "./components/ingredients/edit-ingredient/edit-ingredient.component";
import { IngredientsComponent } from "./components/ingredients/ingredients.component";
import { ListIngredientComponent } from "./components/ingredients/list-ingredient/list-ingredient.component";
import { ListGallerieComponent } from "./components/list-gallerie/list-gallerie.component";
import { PostrecetteComponent } from "./components/postrecette/postrecette.component";
import { AddRecetteComponent } from "./components/recette/add-recette/add-recette.component";
import { EditRecetteComponent } from "./components/recette/edit-recette/edit-recette.component";
import { ListRecetteComponent } from "./components/recette/list-recette/list-recette.component";
import { RecetteComponent } from "./components/recette/recette.component";

import { UploadFileComponent } from "./components/upload-file/upload-file.component";


import { RecettesearchComponent } from './components/recettesearch/recettesearch.component';
import { RandomComponent } from './components/random/random.component';
import { PopulaireComponent } from './components/populaire/populaire.component';
import { TendanceComponent } from './components/tendance/tendance.component';
import { LastrecipesComponent } from './components/lastrecipes/lastrecipes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthenticationGuard } from './guard/authentication.guard';
import { AdminGuard } from 'src/admin.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';
import { ProfiluserComponent } from './components/profiluser/profiluser.component';

const routes: Routes = [
  {path:'home',component:HomeComponent,canActivate:[AuthenticationGuard]  },



{path:'login',component:LoginComponent},
{path:'logout',component:LogoutComponent},
{path:'register', component:RegisterComponent},

{path:'user/management',component:UserComponent,canActivate:[AdminGuard] },
{ path:'',redirectTo:'login', pathMatch:'full'},
{path:'profiluser',component:ProfiluserComponent,canActivate:[AuthenticationGuard] },
  {path:'recette',component:RecetteComponent,canActivate:[AuthenticationGuard]  },
  {path:'contact',component:ContactComponent },
  {path:'postrecette',component:PostrecetteComponent,canActivate:[AuthenticationGuard]  },
  {path:'ingredients',component:IngredientsComponent,canActivate:[AuthenticationGuard]  },


  {path:'recette',component:RecetteComponent,canActivate:[AuthenticationGuard]  },
  {path:'recette/:id',component:RecetteComponent,canActivate:[AuthenticationGuard]  },
  {path:'addrecette',component:AddRecetteComponent,canActivate:[AuthenticationGuard]  },
  {path:'editrecette/:id',component:EditRecetteComponent,canActivate:[AdminGuard] },
  {path:'listrecette',component:ListRecetteComponent,canActivate:[AuthenticationGuard]  },
  {path:'recettes/:categorie',component:RecetteparcategorieComponent,canActivate:[AuthenticationGuard]  },
  {path:'recettesearch',component:RecettesearchComponent,canActivate:[AuthenticationGuard]  },
  {path:'recettelast',component:LastrecipesComponent,canActivate:[AuthenticationGuard]  },
  {path:'recettepopulaire',component:PopulaireComponent,canActivate:[AuthenticationGuard]  },
  {path:'recettetendance',component:TendanceComponent,canActivate:[AuthenticationGuard]  },
  {path:'recetterandom',component:RandomComponent,canActivate:[AuthenticationGuard]  },
  {path:'recettebynote',component:RecettebynoteComponent,canActivate:[AuthenticationGuard]  },

  {path:'abonnement',component:AbonnementComponent,canActivate:[AuthenticationGuard]  },
  {path:'abonnement/:id',component:ListAbonnementComponent,canActivate:[AuthenticationGuard]  },
  {path:'addabonnement',component:AddAbonnementComponent,canActivate:[AuthenticationGuard]  },
  {path:'editabonnement/:id',component:EditAbonnementComponent,canActivate:[AdminGuard] },
  {path:'listabonnement',component:ListAbonnementComponent,canActivate:[AdminGuard] },

  {path:'commentaire',component:CommentaireComponent,canActivate:[AuthenticationGuard]  },
  {path:'commentaire/:id',component:ListCommentaireComponent,canActivate:[AuthenticationGuard]  },
  {path:'addcommentaire',component:AddCommentaireComponent,canActivate:[AuthenticationGuard]  },
  {path:'editcommentaire/:id',component:EditCommentaireComponent,canActivate:[AdminGuard] },
  {path:'listcommentaire',component:ListCommentaireComponent,canActivate:[AdminGuard] },

  {path:'etape',component:ListEtapeComponent,canActivate:[AuthenticationGuard]  },
  {path:'etape/:id',component:ListEtapeComponent,canActivate:[AuthenticationGuard]  },
  {path:'addetape',component:AddEtapeComponent,canActivate:[AuthenticationGuard]  },
  {path:'editetape/:id',component:EditEtapeComponent,canActivate:[AdminGuard] },
  {path:'listetape',component:ListEtapeComponent,canActivate:[AdminGuard] },

  {path:'ingredient',component:IngredientsComponent,canActivate:[AuthenticationGuard]  },
  {path:'ingredient/:id',component:ListIngredientComponent,canActivate:[AuthenticationGuard]  },
  {path:'addingredient',component:AddIngredientComponent,canActivate:[AuthenticationGuard]  },
  {path:'editingredient/:id',component:EditIngredientComponent,canActivate:[AdminGuard] },
  {path:'listingredient',component:ListIngredientComponent,canActivate:[AdminGuard] },

  {path:'gallerie',component:ListGallerieComponent,canActivate:[AuthenticationGuard]  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'}) , NgbModule],  // permet d afficher la page suivante en remettant l ascenceur de la page en haut

  exports: [RouterModule,NgbModule]
})
export class AppRoutingModule { }
