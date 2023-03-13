import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListViewPage } from './game-list-view.page';

describe('GameListViewPage', () => {
  let component: GameListViewPage;
  let fixture: ComponentFixture<GameListViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameListViewPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameListViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
