import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'eaf-date-picker-panel',
  templateUrl: './date-picker-panel.component.html',
  styleUrls: ['./date-picker-panel.component.sass']
})
export class DatePickerPanelComponent implements OnInit, OnChanges {
  @Input() title;
  @Input() dateInput;
  @Output() change = new EventEmitter<{date: Date}>();
  public date = new FormControl(new Date());
  public MAX_DATE: Date;
  constructor() {
  }

  ngOnInit() {

  }

  initDateForm() {
    // const _date = new Date(this.dateInput.replace(/-/g, ','));
    // _date.setMonth(_date.getMonth() - 1);
    // this.date.setValue(_date);
    this.date.setValue(this.dateInput);
    this.MAX_DATE = this.setMaxDate();
  }

  setMaxDate() {
    const _date = new Date();
    // _date.setDate(_date.getDate() + 1);
    return _date;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initDateForm();
  }

  // onChangeDropdownItem(item) {
  //   this.selectedDropdownItem = {...item};
  // }

  // onChangeTermGroupItem(term: any) {
  //   switch (term.id) {
  //     case 1: {
  //       const startDate = new Date();
  //       startDate.setDate(1);
  //       this.startDate.setValue(startDate);
  //       this.endDate.setValue(new Date());
  //       break;
  //     }
  //     case 2: {
  //       const startDate = new Date();
  //       startDate.setMonth(startDate.getMonth() - 1);
  //       startDate.setDate(1);
  //       this.startDate.setValue(startDate);
  //       const endDate = new Date();
  //       endDate.setDate(0);
  //       this.endDate.setValue(endDate);
  //       break;
  //     }
  //     case 3: {
  //       const startDate = new Date();
  //       startDate.setDate(startDate.getDate() - 7);
  //       this.startDate.setValue(startDate);
  //       this.endDate.setValue(new Date());
  //       break;
  //     }
  //   }
  //   this.selectedTermGroupItem = {...term};
  // }

  onSubmit() {
    this.change.emit(
      {
        date: this.date.value
      }
    );
  }
}
