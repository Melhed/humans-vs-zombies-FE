import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mission } from 'src/app/models/mission.model';
import { GameMarkerService } from 'src/app/services/game-marker.service';
import { MissionService } from 'src/app/services/mission.service';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-mission-modal',
  templateUrl: './mission-modal.component.html'
})
export class MissionModalComponent implements OnInit {
  constructor(
    private readonly gameMarkerService: GameMarkerService,
    private readonly missionService: MissionService
  ) {}

  @Input() mission!: Mission;
  @Output() disableModalEvent = new EventEmitter<boolean>();

  private _inEditMode: boolean = false;
  private _isAdmin: boolean = keycloak.hasRealmRole('hvz-admin');
  private _currentMission?: Mission = undefined;

  public get currentMission(): Mission {
    return this._currentMission!;
  }

  public set currentMission(currentMission: Mission) {
    this._currentMission = currentMission;
  }

  ngOnInit(): void {
    this.gameMarkerService.clickedMarkerData.subscribe(
      (mission: Mission) => (this.currentMission = mission)
    );
  }

  sendDisableModal(): void {
    this.disableModalEvent.emit(false);
  }

  updateMission(mission: {
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    lat: string;
    lng: string;
    isHumanVisible: string;
    isZombieVisible: string;
  }) {

    const missionInfo = {
      missionID: this.currentMission.missionID!,
      name: mission.name !== "" ? mission.name : this.currentMission.name!,
      description: mission.description !== "" ? mission.description : this.currentMission.description!,
      startTime: mission.startTime !== undefined ? mission.startTime : this.currentMission.startTime!,
      endTime: mission.endTime !== undefined ? mission.endTime : this.currentMission.endTime!,
      lat: mission.lat !== "" ? parseInt(mission.lat) : this.currentMission.lat!,
      lng: mission.lng !== "" ? parseInt(mission.lng) : this.currentMission.lng!,
      isHumanVisible: mission.isHumanVisible !== "" ? true : false,
      isZombieVisible: mission.isZombieVisible !== "" ? true : false,
      gameId: this.currentMission.gameId!
    };
    this.missionService.updateMission(missionInfo);
  }

  deleteMission(missionId: number) {
    this.missionService.deleteMission(missionId);
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
