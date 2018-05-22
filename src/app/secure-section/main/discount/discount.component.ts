import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'eaf-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.sass']
})
export class DiscountComponent implements OnInit {
  discountForm: FormGroup;
  constructor() { }
  ngOnInit() {
    this.discountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      proto: new FormControl('http'),
      amount: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.discountForm.value);
  }

}
