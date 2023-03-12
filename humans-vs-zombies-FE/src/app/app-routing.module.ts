import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
