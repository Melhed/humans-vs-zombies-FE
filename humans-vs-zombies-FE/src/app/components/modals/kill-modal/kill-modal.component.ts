import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Kill } from 'src/app/models/kill.model';

@Component({
  selector: 'app-kill-modal',
  templateUrl: './kill-modal.component.html',
})
export class KillModalComponent {
  @Input() kill!: Kill;
  @Output() disableModalEvent = new EventEmitter<boolean>();

  private _toggleEditMode: boolean = false;

  public set toggleEditMode(toggleEditMode: boolean) {
    this._toggleEditMode = toggleEditMode;
  }

  public get toggleEditMode(): boolean {
    return this._toggleEditMode;
  }

  sendDisableModal(): void {
    this.disableModalEvent.emit(false);
  }
}
