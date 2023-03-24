import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Kill } from 'src/app/models/kill.model';
import { GameMarkerService } from 'src/app/services/game-marker.service';
import { KillService } from 'src/app/services/kill.service';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-kill-modal',
  templateUrl: './kill-modal.component.html',
})
export class KillModalComponent implements OnInit {
  constructor(
    private readonly gameMarkerService: GameMarkerService,
    private readonly killService: KillService
  ) {}

  @Input() kill!: Kill;
  @Output() disableModalEvent = new EventEmitter<boolean>();

  private _inEditMode: boolean = false;
  private _isAdmin: boolean = keycloak.hasRealmRole('hvz-admin');
  private _currentKill?: Kill = undefined;

  public get currentKill(): Kill {
    return this._currentKill!;
  }

  public set currentKill(currentKill: Kill) {
    this._currentKill = currentKill;
  }

  ngOnInit(): void {
    console.log(this._isAdmin);
    this.gameMarkerService.clickedMarkerData.subscribe(
      (kill: Kill) => (this.currentKill = kill)
    );
  }

  sendDisableModal(): void {
    this.disableModalEvent.emit(false);
  }

  updateKill(kill: {
    story: string;
    lat: string;
    lng: string;
    killer: string;
    victim: string;
  }) {
    const killInfo = {
      id: this.currentKill.id,
      story: kill.story !== '' ? kill.story : this.currentKill.story!,
      lat: kill.lat !== '' ? parseInt(kill.lat) : this.currentKill.lat!,
      lng: kill.lng !== '' ? parseInt(kill.lng) : this.currentKill.lng!,
      killer:
        kill.killer !== '' ? parseInt(kill.killer) : this.currentKill.killer!,
      victim:
        kill.victim !== '' ? parseInt(kill.victim) : this.currentKill.victim!,
      game: this.currentKill.game,
      timeOfDeath: this.currentKill.timeOfDeath,
    };

    console.log(killInfo);
    this.killService.updateKill(killInfo);
  }

  deleteKill(killId: number) {
    console.log(killId);
    this.killService.deleteKill(killId);
    this.sendDisableModal();
  }

  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  public set inEditMode(toggleEditMode: boolean) {
    this._inEditMode = toggleEditMode;
  }

  public get inEditMode(): boolean {
    return this._inEditMode;
  }
}
