import { Component, OnInit, Input, AfterViewInit, ViewChild, HostListener, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'eaf-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})
export class GraphComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: any[];
  @ViewChild('graph') graph;
  windowResizeWidth$: Subscription;
  public xAgendaArr: any[] = [];
  public xAgendaGap: number; // calc N-th item to display on X-axis if based on array length
  public maxDataArrValue = 0; // cals max value in array
  public rangeType: 'dates' | 'hours'; // to dispaly horsFormat or DateFormat at X-axis
  public maxYscaleValue = 0; // calc max value on Y-axis
  private MAX_X_AGENDA_POINTS = 8; // max item.name to display on X-axis agenda
  private graphWidth; // SVG width
  private graphHeight = 256; // SVG height
  private svgns = 'http://www.w3.org/2000/svg';
  private svg;

  constructor() { }

  @HostListener('window:resize', []) onWindowResize() {
    this.calcSvgWidth();
    this.drawChart();
  }


  ngOnInit() {
    // console.log(this.graph);
    // this.windowResizeWidth$ = Observable.fromEvent(window, 'resize')
    // .debounceTime(500)
    // .pluck('target')
    // .pluck('innerWidth')
    // .subscribe((width) => {
    //     console.log(width);
    // });
  }

  ngOnChanges() {
    if (this.data && this.data.length) {
      this.data = this.data.slice();
      this.maxDataArrValue = this.getMaxDataArrValue();
      this.maxYscaleValue = this.getMaxYscaleValue();
      setTimeout(_ => this.graphInit(), 0); // setTimeout needed to avoid ExpressionChangedAfterItHasBeenCheckedError
    }

  }

  ngAfterViewInit() {
  }

  graphInit() {
    this.xAgendaGap = Math.round(this.data.length / this.MAX_X_AGENDA_POINTS);
    this.rangeType = this.data[this.data.length - 1].time.getDate() - this.data[0].time.getDate() === 0 ? 'hours' : 'dates';
    // console.log(`xAgendaGap => ${this.xAgendaGap}, maxDataArrValue => ${this.maxDataArrValue}, maxYscaleValue => ${this.maxYscaleValue}`);

    this.svg = document.getElementById('graph-container');
    this.calcSvgWidth();
    this.svg.setAttribute('height', this.graphHeight);

    // draw horizontal grid
    for (let x = 0; x < 9; x ++) {
      const line = document.createElementNS(this.svgns, 'line');
      line.setAttribute('x1', '0');
      line.setAttribute('y1', x * 32 + '');
      line.setAttribute('x2', '100%');
      line.setAttribute('y2', x * 32 + '');
      line.setAttribute('stroke', '#D0D1DD');
      line.setAttribute('stroke-width', '0.5');
      this.svg.appendChild(line);
    }

    // draw chart
    this.drawChart();
  }


  drawChart() {
    const chartEl = document.getElementById('chart');
    if (chartEl) {
      this.svg.removeChild(chartEl);
    }

    const chartColor = '#FCB528';
    let points = '';
    for (let i = 0; i < this.data.length; i++) {
      const x_pos = (i / (this.data.length - 1) * this.graphWidth);
      const y_pos = (this.graphHeight / 2) * (1 - (this.data[i].value / this.maxYscaleValue));
      // console.log(`point[${i}] => ${x_pos}, ${y_pos}`);
      points += Math.round(x_pos) + ',' + Math.round(y_pos) + ' ';
    }
    points.trim();

    const polyline = document.createElementNS(this.svgns, 'polyline');
    polyline.setAttribute('id', 'chart');
    polyline.setAttribute('points', points);
    polyline.setAttribute('stroke', chartColor);
    polyline.setAttribute('stroke-width', '1');
    polyline.setAttribute('fill', 'none');
    this.svg.appendChild(polyline);
  }

  calcSvgWidth() {
    this.graphWidth = this.graph.nativeElement.clientWidth; // === 890 ? 890 : 540;
    this.svg.setAttribute('width', this.graphWidth);
  }

  getMaxDataArrValue() {
    let max = 0;
    this.data.forEach(el => {
      if (Math.abs(el.value) > max) {
        max = Math.abs(el.value);
      }
    });
    return max;
  }

  getMaxYscaleValue() {
    let i = 0;
    let currVal = this.maxDataArrValue;
    while (currVal > 1) {
      currVal /= 10;
      i += 1;
    }
    return Math.pow(10, i);
  }
}
