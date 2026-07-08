import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoList } from './info-list';

describe('InfoList', () => {
  let component: InfoList;
  let fixture: ComponentFixture<InfoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoList],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
