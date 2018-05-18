import { Component, OnInit, Input } from '@angular/core';

import { News } from '../../../store/main.model';

@Component({
  selector: 'eaf-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.sass']
})
export class NewsItemComponent implements OnInit {
  @Input() news: News;
  constructor() { }

  ngOnInit() {
  }

}
