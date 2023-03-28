import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rules-modal',
  templateUrl: './rules-modal.component.html',
  styleUrls: ['./rules-modal.component.css']
})
export class RulesModalComponent {
  @Output() disableModalEvent = new EventEmitter<boolean>();
  
  sendDisableModalEvent() {
    this.disableModalEvent.emit(false);
  }

}
