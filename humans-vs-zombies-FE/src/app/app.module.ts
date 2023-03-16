import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';

import { GameViewPage } from './pages/game-view/game-view.page';
import { GameListViewPage } from './pages/game-list-view/game-list-view.page';
import { GameListComponent } from './components/game-list/game-list.component';
import { SquadListComponent } from './components/squad-list/squad-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageInfoComponent } from './components/login-page-info/login-page-info.component';
import { GameMapComponent } from './components/game-map/game-map.component';



@NgModule({
  declarations: [ //Components
    AppComponent,
    LoginPage,
    GameViewPage,
    GameListViewPage,
    GameListComponent,
    SquadListComponent,
    NavbarComponent,
    LoginComponent,
    LoginPageInfoComponent,
    GameMapComponent
  ],
  imports: [ //Modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
