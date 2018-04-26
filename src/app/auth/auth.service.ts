import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { LoginData } from './login-data.model';
import { SignupData } from './signup-data.model';
import { User } from '../secure-section/user/user.model';
import * as fromRoot from '../app.reducers';
import * as AuthAction from './store/auth.actions';
import * as UserAction from '../secure-section/user/store/user.actions';
import * as UIAction from '../ui/ui.actions';

@Injectable()
export class AuthService {

  constructor(
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  login(loginData: LoginData) {
    const user: User = this.getFakeUserData(loginData);
    this.store.dispatch(new AuthAction.IsAuth());
    // set Preloader
    // do preloader here ...

    // TODO on success
  this.router.navigate(['/main']);
    this.store.dispatch(new UserAction.FillProfile(user));

    // TODO handle server errors
    // do code here ...
  }

  signup(loginData: SignupData) {
    const user: User = this.getFakeUserData(loginData);

    this.store.dispatch(new AuthAction.IsAuth());
    // set Preloader
    // do preloader here ...

    // TODO on success
    this.router.navigate(['/main']);
    this.store.dispatch(new UserAction.FillProfile(user));

    // TODO handle server errors
    // do code here ...
  }

  logout() {
    this.store.dispatch(new AuthAction.IsUnauth());
    this.store.dispatch(new UserAction.ClearProfile());
    this.router.navigate(['/']);
  }

  getFakeUserData(loginData) {
    const id = Math.round(Math.random() * 10000);
    return {
      email: loginData.email,
      id: id,
      name: 'user_' + id,
      icqAccount: id,
      skypeAccount: 'skype' + id,
      balance: 100,
      totalIncomeAmount: 23500,
      rebillsAmount: 18050,
      sellsAmount: 4989,
      uniqueVisitorsAmount: 324,
      sources: [
        'edu-affiliates.com',
        'fonts.google.com',
        'depositphotos.com',
        'сheapсustompapers.com',
        'plasticjam.github.com',
        'plasticjam.atlassian.net',
      ],
      sitesTraffic: [
        {
          name: '99papers',
          amount: 768
        },
        {
          name: 'bookwormlab',
          amount: 543
        },
        {
          name: 'essaybox',
          amount: 323
        },
        {
          name: 'essaywriter',
          amount: 188
        }
      ],
      // https://www.artlebedev.ru/country-list/
      geoTargets: [
        {
          name: 'United Kingdom',
          amount: 323,
          abbr: 'gb'
        },
        {
          name: 'Spain',
          amount: 256,
          abbr: 'es'
        },
        {
          name: 'Germany',
          amount: 209,
          abbr: 'de'
        },
        {
          name: 'Australia',
          amount: 187
        }
      ],
      deviceTypes: [
        {
          name: 'desktop',
          amount: 32300
        },
        {
          name: 'tablet',
          amount: 22301
        }
        ,        {
          name: 'phone',
          amount: 12300
        }
      ],
      news: [
        {
          date: new Date(),
          title: 'Новые условия по рефералке',
          content: `Добрый день! Сезон идет во всю, поэтому напоминанию о нашей реферальной программе,
           т.к. это источник постоянного пассивного дохода!`
        }
      ],
    };
  }
}
