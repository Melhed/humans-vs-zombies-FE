import { Component } from '@angular/core';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.page.html',
  styleUrls: ['./game-view.page.css'],
})
export class GameViewPage {

  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
