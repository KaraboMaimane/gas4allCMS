import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessformComponent } from './businessform.component';

describe('BusinessformComponent', () => {
  let component: BusinessformComponent;
  let fixture: ComponentFixture<BusinessformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
