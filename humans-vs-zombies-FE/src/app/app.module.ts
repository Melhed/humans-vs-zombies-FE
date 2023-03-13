import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { GameViewPage } from './pages/game-view/game-view.page';
import { GameListViewPage } from './pages/game-list-view/game-list-view.page';
import { GameListComponent } from './components/game-list/game-list.component';

@NgModule({
  declarations: [ //Components
    AppComponent,
    LoginPage,
    LoginFormComponent,
    GameViewPage,
    GameListViewPage,
    GameListComponent
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
