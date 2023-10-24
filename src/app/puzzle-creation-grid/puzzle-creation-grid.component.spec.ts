import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleCreationGridComponent } from './puzzle-creation-grid.component';

describe('PuzzleCreationGridComponent', () => {
  let component: PuzzleCreationGridComponent;
  let fixture: ComponentFixture<PuzzleCreationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleCreationGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleCreationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
