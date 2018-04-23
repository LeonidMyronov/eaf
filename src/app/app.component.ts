import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from './app.reducers';

@Component({
  selector: 'eaf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoginFormOpened$: Observable<boolean>;
  isSignupFormOpened$: Observable<boolean>;
  constructor (
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isLoginFormOpened$ = this.store.select(fromRoot.getIsLoginFormOpened);
    this.isSignupFormOpened$ = this.store.select(fromRoot.getIsSignupFormOpened);
    this.store.select(fromRoot.getIsAuth)
    .subscribe(response => console.log(response));
  }
}
