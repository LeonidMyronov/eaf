import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

import { TranslateService } from '@ngx-translate/core';
import { RunService } from './core/run.service';

import * as fromRoot from './app.reducers';
import * as UIAction from './ui/ui.actions';

@Component({
  selector: 'eaf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  isLoginFormOpened$: Observable<boolean>;
  isSignupFormOpened$: Observable<boolean>;
  isMobileMenuOpened$: Observable<boolean>;
  watcher: Subscription;
  constructor (
    private store: Store<fromRoot.State>,
    private translate: TranslateService,
    private runService: RunService,
    private media: ObservableMedia
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

      this.watcher = this.media.subscribe((change: MediaChange) => {
        this.store.dispatch(new UIAction.SetActiveMediaQuery(change.mqAlias));
      });

  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }
}
