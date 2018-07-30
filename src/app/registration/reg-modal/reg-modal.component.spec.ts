import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegModalComponent } from './reg-modal.component';

describe('RegModalComponent', () => {
  let component: RegModalComponent;
  let fixture: ComponentFixture<RegModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
