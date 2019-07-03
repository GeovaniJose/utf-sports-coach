import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencaPage } from './presenca.page';

describe('PresencaPage', () => {
  let component: PresencaPage;
  let fixture: ComponentFixture<PresencaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresencaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresencaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
