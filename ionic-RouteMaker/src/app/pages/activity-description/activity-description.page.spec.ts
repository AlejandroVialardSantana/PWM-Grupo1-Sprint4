import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivityDescriptionPage } from './activity-description.page';

describe('ActivityDescriptionPage', () => {
  let component: ActivityDescriptionPage;
  let fixture: ComponentFixture<ActivityDescriptionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ActivityDescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
