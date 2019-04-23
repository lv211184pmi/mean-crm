import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';

import { LoginService } from './../../../core/services/auth/login.service';
import { RegistrationComponent } from './registration.component';
import { HeaderComponent } from '../header/header.component';
import { of } from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let de: DebugElement;
  let spy: jasmine.Spy;
  let service: LoginService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [RegistrationComponent, HeaderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();

    service = de.injector.get(LoginService);
    spy = spyOn(service, 'registration').and.returnValue(of(null));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', () => {
    component.regForm.controls['email'].patchValue('some@gmail.com');
    component.regForm.controls['password'].patchValue('password');
    expect(component.regForm.valid).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.regForm.controls['email'].patchValue('');
    component.regForm.controls['password'].patchValue('');
    expect(component.regForm.valid).toBeFalsy();
  });

  it('should be call onSubmit', () => {
    component.onSubmit({});

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.any()).toBeTruthy();
  });

  it('should be create form', () => {
    component.ngOnInit();
    expect(component.regForm).not.toBeUndefined();
  });

  it('email should be type AbstractControl', () => {
    const email = component.email;
    expect(email instanceof AbstractControl).toBeTruthy();
  });

  it('pass should be type AbstractControl', () => {
    const pass = component.pass;
    expect(pass instanceof AbstractControl).toBeTruthy();
  });
});
