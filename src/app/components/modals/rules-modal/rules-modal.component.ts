import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rules-modal',
  templateUrl: './rules-modal.component.html',
  styleUrls: []
})
export class RulesModalComponent {
  @Output() disableModalEvent = new EventEmitter<boolean>();

  sendDisableModalEvent() {
    this.disableModalEvent.emit(false);
  }

}
