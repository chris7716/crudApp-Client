import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRegModalComponent } from './edit-reg-modal.component';

describe('EditRegModalComponent', () => {
  let component: EditRegModalComponent;
  let fixture: ComponentFixture<EditRegModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRegModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
