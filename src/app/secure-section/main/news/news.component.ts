import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as fromMain from '../../store/main.reducer';
import * as MainActions from '../../store/main.actions';
import { News } from '../../store/main.model';

export interface NewsState {
  more: boolean;
  lastFetched: number;
  news: News[];
}

@Component({
  selector: 'eaf-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})

export class NewsComponent implements OnInit, OnDestroy {
  newsState: NewsState;
  newsSubs: Subscription;

  constructor(
    private store: Store<fromMain.MainState>,
  ) { }

  ngOnInit() {
    this.newsSubs = this.store.select(fromMain.getNews)
      .subscribe(
        (response: NewsState) => {
          if (!response.lastFetched) {
            this.store.dispatch(new MainActions.DoFetchNews(1));
          } else {
            this.newsState = response;
          }
        }
      );
  }

  ngOnDestroy() {
    this.newsSubs.unsubscribe();
  }
}
