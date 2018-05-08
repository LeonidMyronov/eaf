import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TranslateService } from '@ngx-translate/core';

import * as fromRoot from './app.reducers';
import { RunService } from './core/run.service';

@Component({
  selector: 'eaf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoginFormOpened$: Observable<boolean>;
  isSignupFormOpened$: Observable<boolean>;
  isMobileMenuOpened$: Observable<boolean>;
  constructor (
    private store: Store<fromRoot.State>,
    private translate: TranslateService,
    private runService: RunService,
  ) { }

  ngOnInit() {
    this.isLoginFormOpened$ = this.store.select(fromRoot.getIsLoginFormOpened);
    this.isSignupFormOpened$ = this.store.select(fromRoot.getIsSignupFormOpened);
    this.isMobileMenuOpened$ = this.store.select(fromRoot.getIsMobileMenuOpened);
    // this.store.select(fromRoot.getIsAuth)
    //   .subscribe(response => console.log('Is Auth =>', response));
    this.store.select(fromRoot.getCurrentLanguage)
      .subscribe( lang => {
        if (!lang) {
          // this language will be used as a fallback when a translation isn't found in the current language
          // console.log('Translate. set fallback lang');
          this.translate.setDefaultLang('en');
        } else {
          // the lang to use, if the lang isn't available, it will use the current loader to get them
          // console.log('Translate. set Active lang =>', lang);
          this.translate.use(lang);
        }
      });

  }
}
