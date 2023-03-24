import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SquadCheckin } from 'src/app/models/squad-checkin.model';

@Component({
  selector: 'app-checkin-modal',
  templateUrl: './checkin-modal.component.html'
})
export class CheckinModalComponent {
  @Input() checkin!: SquadCheckin;
  @Output() disableModalEvent = new EventEmitter<boolean>();

  sendDisableModal(): void {
    this.disableModalEvent.emit(false);
  }
}
