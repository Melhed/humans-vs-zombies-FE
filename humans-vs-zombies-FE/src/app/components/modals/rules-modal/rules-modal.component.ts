import { Component } from '@angular/core';

@Component({
  selector: 'app-rules-modal',
  templateUrl: './rules-modal.component.html',
  styleUrls: ['./rules-modal.component.css']
})
export class RulesModalComponent {
  showModal = false;
  
  toggleModal() {
    this.showModal = !this.showModal;
  }

}
