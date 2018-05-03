import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'eaf-term-picker-panel',
  templateUrl: './term-picker-panel.component.html',
  styleUrls: ['./term-picker-panel.component.sass']
})
export class TermPickerPanelComponent implements OnInit, OnChanges {
  @Input() dropdownList;
  public selectedDropdownItem;
  public hovered = false;
  public termGroup: any[];
  public selectedTermGroupItem: any;
  public startDate = new FormControl(new Date());
  public endDate = new FormControl(new Date());
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.dropdownList);
    this.selectedDropdownItem = this.dropdownList[0];
    this.termGroup = [
      { name: 'Этот месяц', id: 1 },
      { name: 'Прошлый месяц', id: 2 },
      { name: 'Прошлая неделя', id: 3 }];
    this.selectedTermGroupItem = this.termGroup[2];
  }

  onChange(item) {
    this.selectedDropdownItem = item;
  }

  onSubmit() {
    console.log(this.startDate.value, this.endDate.value, this.selectedDropdownItem, this.selectedTermGroupItem);
  }
}
