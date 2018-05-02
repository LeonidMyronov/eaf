import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Conversion } from '../../store/main.model';

@Component({
  selector: 'eaf-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.sass']
})
export class ConversionComponent implements OnInit {
  @Input('data') data: Conversion[];
  @Input('width') width;
  @ViewChild('time') time;
  public conversionTable = {
    head : ['Время', 'Сайт', 'Номер заказа', 'Сумма']
  };

  constructor(
    // private elRef: ElementRef,
    // private render: Renderer2
  ) { }

  ngOnInit() {
    // console.log(this.elRef);
    // if (this.elRef.nativeElement.firstChild.clientWidth === 1300) {
    //   this.render.
    // }
  }

  // ngAfterViewInit() {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   // console.log(this.time);
  // }

}
