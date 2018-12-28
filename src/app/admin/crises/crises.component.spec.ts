/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrisesComponent } from './crises.component';

describe('CrisesComponent', () => {
  let component: CrisesComponent;
  let fixture: ComponentFixture<CrisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
