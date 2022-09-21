import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowToDoComponent } from './show-to-do.component';

describe('ShowToDoComponent', () => {
  let component: ShowToDoComponent;
  let fixture: ComponentFixture<ShowToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowToDoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
