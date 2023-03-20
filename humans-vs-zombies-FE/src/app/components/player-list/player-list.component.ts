import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { EditPlayerService } from 'src/app/services/edit-player.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html'
})
export class PlayerListComponent implements OnInit{

  constructor(private readonly editPlayerService: EditPlayerService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder){}

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
    this.editPlayerService.findAllPlayers();
    this.router.navigateByUrl("/edit-player");
  }

  submit() {
    console.log("Form Submitted: " + this.contactForm.value)
    console.log(this.contactForm.value)
    this.editPlayerService.updatePlayerState(1, this.contactForm.value);
  }
}
