import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  showModal = false;
  showCreateGameModal = false;
    toggleModal() {
      this.showModal = !this.showModal;
    }
    toggleCreateGameModal() {
      this.showCreateGameModal = !this.showCreateGameModal;
    }
    

}
