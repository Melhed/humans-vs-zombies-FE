import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListViewPage } from './pages/game-list-view/game-list-view.page';
import { GameViewPage } from './pages/game-view/game-view.page';
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/login"
  },
  {
    path: "login", 
    component: LoginPage
  },
  {
    path: "game-view",
    component: GameViewPage
  },
  {
    path: "game-list-view",
    component: GameListViewPage
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
