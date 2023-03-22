import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { EditPlayerService } from 'src/app/services/edit-player.service';
import { PlayerListService } from 'src/app/services/player-list.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html'
})
export class PlayerListComponent implements OnInit{

  errorMessage: string = '';

  constructor(
    private readonly editPlayerService: EditPlayerService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly playerListService: PlayerListService
    ){}

  @Input() players: Player[] = [];

  contactForm: FormGroup = new FormGroup({});
  states = [
    { state: "UNREGISTERED" },
    { state: "ADMINISTRATOR" },
    { state: "NO_SQUAD" },
    { state: "SQUAD_MEMBER" }
  ];

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      states: [null]
    });
    this.playerListService.findAllPlayers();
    this.router.navigateByUrl("/edit-player");
  }

  submit(playerId: any) {
    console.log("From Submit");
    this.editPlayerService.updateObjectProperty(playerId, "SQUAD_MEMBER");
    //this.editPlayerService.updatePlayer(playerId, "SQUAD_MEMBER");
    // this.editPlayerService.updatePlayerState(playerId, this.contactForm.value)
    // .subscribe({
    //   next:(response: any) => {
    //     console.log("NEXT: ", response)
    //   },
    //   error:(error: HttpErrorResponse) => {
    //     console.log("ERROR: ", error.message);
    //   }
      
    // });
  }
}
