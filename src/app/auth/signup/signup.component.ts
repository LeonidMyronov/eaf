import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { HelperService } from '../../core/helper.service';
import { AuthService } from '../auth.service';

import * as fromRoot from '../../app.reducers';
import * as UIAction from '../../ui/ui.actions';

@Component({
  selector: 'eaf-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>,
    private helper: HelperService
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^([a-z0-9_\\+\\.-]+)@([a-z0-9\\.-]+)\\.([a-z\\.]{2,6})$')]),
      passwords: new FormGroup({
        password: new FormControl('', Validators.required),
        repeatPassword: new FormControl('', Validators.required)
      }, this.passwordMatchValidator),
      name: new FormControl(''),
      icq: new FormControl(''),
      skype: new FormControl(''),
      promoKey: new FormControl(''),
      recaptcha: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.authService.signup(this.signupForm.value);
    this.onCloseForm();
  }

  onCloseForm() {
    this.store.dispatch(new UIAction.IsSignupFormOpened(false));
    this.helper.preventBodyToScroll(false);
  }

  onCaptchaResolved(e) {
    console.log('captcha resolved => ', e);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('repeatPassword').value
       ? null : {'mismatch': true};
 }
}
