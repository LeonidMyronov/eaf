import { Component, OnInit, Input, ViewChild, ChangeDetectorRef, AfterViewChecked } from '@angular/core';

import { Conversion } from '../../store/main.model';

@Component({
  selector: 'eaf-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.sass']
})
export class ConversionComponent implements OnInit, AfterViewChecked {
  @Input('data') data: Conversion[];
  @Input('widthClass') widthClass;
  @ViewChild('time') time;
  public conversionTable = {
    head : ['Время', 'Сайт', 'Номер заказа', 'Сумма']
  };

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  // prevent ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked on ng 4
  // https://github.com/angular/angular/issues/17572
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}
