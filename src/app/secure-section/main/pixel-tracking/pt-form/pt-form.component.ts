import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MainStorageService } from '../../../services/main-storage.service';

import { Site } from '../../../../core/core.model';

@Component({
  selector: 'eaf-pt-form',
  templateUrl: './pt-form.component.html',
  styleUrls: ['./pt-form.component.sass']
})
export class PtFormComponent implements OnInit {
  @Input() data: Site;
  @Output() close = new EventEmitter<boolean>();
  ptEventsForm: FormGroup;
  ptEventsList = [];

  constructor(
    private mainStorage: MainStorageService
  ) { }

  ngOnInit() {
    this.initForm();
    this.ptEventsList = this.mainStorage.getPTEvents();
  }

  initForm() {
    this.ptEventsForm = new FormGroup({});
  }

  onClickPTEvent(id: number) {
    console.log(id);
  }

  onCloseForm() {
    this.close.emit(true);
  }

  onSubmit() {}
}
