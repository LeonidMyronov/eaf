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
  @Input() selectedDropdownItem;
  @Input() dropdownList;
  @Output() change = new EventEmitter<{date: Date}>();
  public date = new FormControl(new Date());
  public MAX_DATE: Date;
  constructor() {
  }

  ngOnInit() {

  }

  initDateForm() {
    this.date.setValue(this.dateInput);
    this.MAX_DATE = this.setMaxDate();
  }

  setMaxDate() {
    const _date = new Date();
    return _date;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initDateForm();
  }

  onChangeDropdownItem(item) {
    this.selectedDropdownItem = item;
  }


  onSubmit() {
    const emitObj = {
      date: this.date.value
    };
    if (this.selectedDropdownItem) {
      emitObj['dropdown'] = this.selectedDropdownItem;
    }

    this.change.emit(emitObj);
  }
}
