import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';

import { GameViewPage } from './pages/game-view/game-view.page';
import { GameListViewPage } from './pages/game-list-view/game-list-view.page';
import { HttpAuthInterceptor } from './interceptors/auth-http.interceptor';
import { GameListComponent } from './components/game-list/game-list.component';
import { SquadListComponent } from './components/squad-list/squad-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageInfoComponent } from './components/login-page-info/login-page-info.component';
import { GameMapComponent } from './components/game-map/game-map.component';
import { RefreshTokenHttpInterceptor } from './interceptors/refresh-token-http.interceptor';
import { ChatComponent } from './components/chat/chat.component';
import { EditPlayerPage } from './pages/edit-player/edit-player.page';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { KillModalComponent } from './components/modals/kill-modal/kill-modal.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    //Components
    AppComponent,
    ChatComponent,
    LoginPage,
    GameViewPage,
    GameListViewPage,
    GameListComponent,
    SquadListComponent,
    NavbarComponent,
    LoginComponent,
    LoginPageInfoComponent,
    GameMapComponent,
    EditPlayerPage,
    PlayerListComponent,
    ChatComponent,
    KillModalComponent,
  ],
  imports: [
    //Modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenHttpInterceptor,
      multi: true,
    },
    // Add HttpAuthInterceptor - Add Bearer Token to request
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
