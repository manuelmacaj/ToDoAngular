import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoInsertComponent } from './to-do-insert.component';

describe('ToDoInsertComponent', () => {
  let component: ToDoInsertComponent;
  let fixture: ComponentFixture<ToDoInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoInsertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
