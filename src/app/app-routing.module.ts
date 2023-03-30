import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { EditPlayerPage } from './pages/edit-player/edit-player.page';
import { GameListViewPage } from './pages/game-list-view/game-list-view.page';
import { GameViewPage } from './pages/game-view/game-view.page';
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "game-list-view"
  },
  {
    path: "login",
    component: LoginPage
  },
  {
    path: "game-view",
    component: GameViewPage,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "edit-player",
    component: EditPlayerPage,
    canActivate: [AuthenticationGuard]
  },
  {
    path: "game-list-view",
    component: GameListViewPage,
    //canActivate: [AuthenticationGuard]
  },
  {
    path: "**",
    redirectTo: "game-list-view",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
