import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernameSetupComponent } from './username-setup.component';

describe('UsernameSetupComponent', () => {
  let component: UsernameSetupComponent;
  let fixture: ComponentFixture<UsernameSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsernameSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsernameSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
