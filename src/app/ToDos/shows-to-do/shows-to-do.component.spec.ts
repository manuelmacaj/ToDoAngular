import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsToDoComponent } from './shows-to-do.component';

describe('ShowsToDoComponent', () => {
  let component: ShowsToDoComponent;
  let fixture: ComponentFixture<ShowsToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowsToDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowsToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
