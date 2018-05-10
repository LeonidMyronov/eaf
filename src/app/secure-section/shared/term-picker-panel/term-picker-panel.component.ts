import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SiteTraffic } from '../../store/main.model';

@Component({
  selector: 'eaf-term-picker-panel',
  templateUrl: './term-picker-panel.component.html',
  styleUrls: ['./term-picker-panel.component.sass']
})
export class TermPickerPanelComponent implements OnInit, OnChanges {
  @Input() dropdownList;
  @Output() change = new EventEmitter<{fromDate: Date, toDate: Date, site: SiteTraffic}>();
  public selectedDropdownItem;
  public hovered = false;
  public termGroup: any[];
  public selectedTermGroupItem: any;
  public startDate = new FormControl(new Date());
  public endDate = new FormControl(new Date());
  constructor() {
  }

  ngOnInit() {
    this.termGroup = [
      { name: 'Этот месяц', id: 1 },
      { name: 'Прошлый месяц', id: 2 },
      { name: 'Прошлая неделя', id: 3 }];
      this.onChangeTermGroupItem(this.termGroup[2]);
      this.startDate.valueChanges.subscribe(c => this.selectedTermGroupItem.id = null);
      this.endDate.valueChanges.subscribe(c => this.selectedTermGroupItem.id = null);
      // emit initial data
      this.onSubmit();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedDropdownItem = {...this.dropdownList[0]};
  }

  onChangeDropdownItem(item) {
    this.selectedDropdownItem = {...item};
  }

  onChangeTermGroupItem(term: any) {
    switch (term.id) {
      case 1: {
        const startDate = new Date();
        startDate.setDate(1);
        this.startDate.setValue(startDate);
        this.endDate.setValue(new Date());
        break;
      }
      case 2: {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setDate(1);
        this.startDate.setValue(startDate);
        const endDate = new Date();
        endDate.setDate(0);
        this.endDate.setValue(endDate);
        break;
      }
      case 3: {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        this.startDate.setValue(startDate);
        this.endDate.setValue(new Date());
        break;
      }
    }
    this.selectedTermGroupItem = {...term};
  }
  onSubmit() {
    this.change.emit(
      {
        fromDate: this.startDate.value,
        toDate: this.endDate.value,
        site: this.selectedDropdownItem
      }
    );
  }
}
