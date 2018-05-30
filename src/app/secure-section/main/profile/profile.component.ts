import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'eaf-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  date = new Date();
  personalDataForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  onSubmitPersonalData() {}

}
