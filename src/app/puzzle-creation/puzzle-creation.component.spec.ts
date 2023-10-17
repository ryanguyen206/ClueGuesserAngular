import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleCreationComponent } from './puzzle-creation.component';

describe('PuzzleCreationComponent', () => {
  let component: PuzzleCreationComponent;
  let fixture: ComponentFixture<PuzzleCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PuzzleCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
