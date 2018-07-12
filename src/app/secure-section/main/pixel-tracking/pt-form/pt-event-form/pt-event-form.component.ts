import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MainStorageService } from '../../../../services/main-storage.service';
import { PTEventData, PTEventParamsData } from '../../../../store/main.model';

@Component({
  selector: 'eaf-pt-event-form',
  templateUrl: './pt-event-form.component.html',
  styleUrls: ['./pt-event-form.component.sass']
})
export class PtEventFormComponent implements OnInit {
  @Input() ptEventParams: PTEventParamsData;
  @Output() changePTEvent = new EventEmitter<PTEventData>();
  public ptEventForm: FormGroup;
  public ptEventFormData = [];

  constructor(
    private mainStorage: MainStorageService
  ) { }

  ngOnInit() {
    this.ptEventFormData = this.mainStorage.getPTEventFormdata();
    this.initForm();
  }

  initForm() {
    // form initialization
    this.ptEventForm = new FormGroup({});
    // add params textarea to formGroup
    this.ptEventForm.addControl('params', new FormControl('', Validators.required));
    this.ptEventFormData.forEach((menu: any) => {
      const control = new FormControl(menu.items[0].id.toString());
      this.ptEventForm.addControl(menu.name, control);
    });
    if (this.ptEventParams) {
      this.updateForm();
    }
  }

  updateForm() {
    Object.keys(this.ptEventForm.controls).forEach( c => {
      console.log(c, this.ptEventParams[c]);
      this.ptEventForm.get(c).patchValue(this.ptEventParams[c].toString());
    });
  }

  onSubmit() {
    this.changePTEvent.emit(this.ptEventForm.value);
  }

}
