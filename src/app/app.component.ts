import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { TranslateService } from '@ngx-translate/core';
import { RunService } from './core/run.service';

import * as fromRoot from './app.reducers';
import * as UIActions from './ui/ui.actions';

@Component({
  selector: 'eaf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    trigger(
      'showNotification', [
        state('in', style({opacity: 1})),
        transition('void => *', [
          style({
            opacity: 0
          }),
          animate(500)
        ]
      )
    ]
    )
  ]
})
export class AppComponent implements OnInit, AfterViewChecked, OnDestroy {
  title = 'app';
  isLoginFormOpened$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isSignupFormOpened$: Observable<boolean>;
  isMobileMenuOpened$: Observable<boolean>;
  notification: string;

  private subs: Subscription[] = [];

  constructor (
    private store: Store<fromRoot.State>,
    private translate: TranslateService,
    private runService: RunService,
    private media: ObservableMedia,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isLoginFormOpened$ = this.store.select(fromRoot.getIsLoginFormOpened);
    this.isSignupFormOpened$ = this.store.select(fromRoot.getIsSignupFormOpened);
    this.isMobileMenuOpened$ = this.store.select(fromRoot.getIsMobileMenuOpened);
    this.isLoading$ = this.store.select(fromRoot.getLoadingState);

    this.subs.push(
      this.store.select(fromRoot.getNotificationState)
        .subscribe(message => this.notification = message)
    );

    this.subs.push(
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
      })
    );

    this.subs.push(
      this.media.subscribe((change: MediaChange) => {
        this.store.dispatch(new UIActions.SetActiveMediaQuery(change.mqAlias));
      })
    );
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  onAnimationEnd() {
    if (this.notification) {
      setTimeout(() => {
        this.store.dispatch(new UIActions.ShowNotification(''));
      }, 3000);
    }
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
