import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { HelperService } from '../../core/helper.service';

import * as fromRoot from '../../app.reducers';
import * as layoutAction from '../../store/layout.actions';

@Component({
  selector: 'eaf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private location: Location,
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
    console.log(this.loginForm);
  }

  onCloseForm() {
    // this.location.back();
    this.store.dispatch(new layoutAction.IsLoginFormOpened(false));
    this.helper.preventBodyToScroll(false);
  }
}
