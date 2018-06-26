import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromMain from '../../../store/main.reducer';
import { PromoTheme } from '../promo.model';

@Component({
  selector: 'eaf-landing',
  templateUrl: '../base-theme/base-theme.component.html',
  styleUrls: ['../base-theme/base-theme.component.sass']
})

export class LandingComponent implements OnInit {
  themesState$: Observable<{themes: PromoTheme[]}>;

  constructor(
    private store: Store<fromMain.MainState>
  ) { }

  ngOnInit() {
    this.themesState$ = this.store.select(fromMain.getPromoLandings);
  }

}
