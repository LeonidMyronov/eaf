import { Component, OnInit } from '@angular/core';

import { HelperService } from '../../../../core/helper.service';

@Component({
  selector: 'eaf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(
    private helperService: HelperService
  ) { }

  ngOnInit() {
  }

  onLinkCopy(el) {
    el.select();
    document.execCommand('copy');
    el.setSelectionRange(0, 0);
    el.blur();
  }
}
