import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkTrainingPage } from './mark-training.page';

describe('MarkTrainingPage', () => {
  let component: MarkTrainingPage;
  let fixture: ComponentFixture<MarkTrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkTrainingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkTrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
