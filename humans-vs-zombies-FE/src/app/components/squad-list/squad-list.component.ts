import { Component, Input, OnInit } from '@angular/core';
import { Squad } from 'src/app/models/squad.model';

@Component({
  selector: 'app-squad-list',
  templateUrl: './squad-list.component.html',
  styleUrls: ['./squad-list.component.css']
})
export class SquadListComponent implements OnInit{

  @Input() squads: Squad[] = [];

  constructor() {}
  ngOnInit(): void {
      
  }
}
