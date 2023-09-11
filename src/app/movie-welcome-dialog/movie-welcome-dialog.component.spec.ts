import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieWelcomeDialogComponent } from './movie-welcome-dialog.component';

describe('MovieWelcomeDialogComponent', () => {
  let component: MovieWelcomeDialogComponent;
  let fixture: ComponentFixture<MovieWelcomeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieWelcomeDialogComponent]
    });
    fixture = TestBed.createComponent(MovieWelcomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
