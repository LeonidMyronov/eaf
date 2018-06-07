import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  preventBodyToScroll(scroll: boolean): void {
    const body = document.querySelector('body');
    if (scroll) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }

  convertTimestamp2Days(date: Date): number {
    return Math.round(this.convertTimestamp2Hours(date) / 24);
  }

  convertTimestamp2Hours(date: Date): number {
    return Math.round(date.getDate() / 3600 / 1000);
  }

}
