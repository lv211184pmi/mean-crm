import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from './core/services/auth/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let service: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(AuthService);
    spy = spyOn(service, 'setToken');
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should call AuthService', async(() => {
    localStorage.setItem('token', 'mock token');
    component.ngOnInit();
    expect(spy.calls.any()).toBeTruthy();
  }));
});
