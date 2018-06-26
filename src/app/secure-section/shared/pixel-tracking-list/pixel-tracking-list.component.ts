import { Component, Input, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { PixelTracking } from '../../store/main.model';

@Component({
  selector: 'eaf-pixel-tracking-list',
  templateUrl: './pixel-tracking-list.component.html',
  styleUrls: ['./pixel-tracking-list.component.sass']
})
export class PixelTrackingListComponent implements AfterViewChecked {

  @Input('data') data: PixelTracking[];
  @ViewChild('time') time;
  public ptTable = {
    head : ['date', 'startedFillOrderForm', 'startedFillInquiryForm', 'orderCreated',
      'inquiryCreated', 'orderPaid', 'userRegistered', 'onlineChat']
  };

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  // prevent ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked on ng 4
  // https://github.com/angular/angular/issues/17572
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}
