import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Kill } from 'src/app/models/kill.model';
import { GameMarkerService } from 'src/app/services/game-marker.service';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-kill-modal',
  templateUrl: './kill-modal.component.html',
})
export class KillModalComponent implements OnInit {
  constructor(private readonly gameMarkerService: GameMarkerService) {}

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
    lat: number;
    lng: number;
    killer: number;
    victim: number;
  }) {
    if (kill.story === '' && this.currentKill.story !== '')
      kill.story = this.currentKill.story!;
    if (kill.lat === undefined && this.currentKill.lat !== undefined)
      kill.lat === this.currentKill.lat + '';
    if (kill.lng === undefined && this.currentKill.lng !== undefined)
      kill.lng === this.currentKill.lng + '';
    if (kill.killer === undefined && this.currentKill.killer !== undefined)
      kill.killer = this.currentKill.killer;
    if (kill.victim === undefined && this.currentKill.victim !== undefined)
      kill.victim = this.currentKill.victim;

    // set the empty variables above to the this.currentKill variables
    const killInfo = {
      id: this.currentKill.id,
      story: kill.story,
      lat: kill.lat,
      lng: kill.lng,
      killer: kill.killer,
      victim: kill.victim,
      game: this.currentKill.game,
      timeOfDeath: this.currentKill.timeOfDeath,
    };

    console.log(killInfo);

    // this.killService.updateKill(killInfo);
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
