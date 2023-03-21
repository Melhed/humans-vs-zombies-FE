import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerPage } from './edit-player.page';

describe('EditPlayerPage', () => {
  let component: EditPlayerPage;
  let fixture: ComponentFixture<EditPlayerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlayerPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
