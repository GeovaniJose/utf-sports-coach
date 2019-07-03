import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteNotificationPage } from './write-notification.page';

describe('WriteNotificationPage', () => {
  let component: WriteNotificationPage;
  let fixture: ComponentFixture<WriteNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteNotificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
