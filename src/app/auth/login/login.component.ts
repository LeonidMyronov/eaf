import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { HelperService } from '../../core/helper.service';

import * as fromRoot from '../../app.reducers';
import * as UIAction from '../../ui/ui.actions';
import * as AuthAction from '../store/auth.actions';

@Component({
  selector: 'eaf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private store: Store<fromRoot.State>,
    private helper: HelperService,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^([a-z0-9_\\+\\.-]+)@([a-z0-9\\.-]+)\\.([a-z\\.]{2,6})$')]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.store.dispatch(new UIAction.IsLoading(true));
    this.store.dispatch(new AuthAction.DoLogin(this.loginForm.value));
  }

  onCloseForm() {
    this.store.dispatch(new UIAction.IsLoginFormOpened(false));
    this.helper.preventBodyToScroll(false);
  }

  onSignup() {
    this.onCloseForm();
    this.store.dispatch(new UIAction.IsSignupFormOpened(true));
    this.helper.preventBodyToScroll(true);
  }
}
