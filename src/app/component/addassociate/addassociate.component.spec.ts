import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddassociateComponent } from './addassociate.component';

describe('AddassociateComponent', () => {
  let component: AddassociateComponent;
  let fixture: ComponentFixture<AddassociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddassociateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddassociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
