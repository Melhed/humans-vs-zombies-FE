import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-mission-modal',
  templateUrl: './create-mission-modal.component.html',
})
export class CreateMissionModalComponent {
  @Output() disableModalEvent = new EventEmitter<boolean>();

  sendDisableModalEvent() {
    this.disableModalEvent.emit(false);
  }
}
