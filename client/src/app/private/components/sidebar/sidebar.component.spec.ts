import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../../core/services/auth/auth.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let de: DebugElement;
  let service: AuthService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SidebarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(AuthService);
    spy = spyOn(service, 'logout');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout', () => {
    component.logout();
    expect(spy.calls.any()).toBeTruthy();
  });
});
