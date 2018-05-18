import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromRoot from '../../../../app.reducers';
import { News } from '../../../store/main.model';


@Component({
  selector: 'eaf-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.sass']
})
export class NewsItemComponent implements OnInit, OnDestroy {
  @Input() news: News;
  public displayContent: boolean;
  private subs: Subscription;
  constructor(
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.subs = this.store.select(fromRoot.getActiveMediaQuery)
      .subscribe(
        (activeMedia: string) => this.displayContent = activeMedia === 'xs' ? false : true
      );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
