import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  preventBodyToScroll(scroll: boolean) {
    const body = document.querySelector('body');
    if (scroll) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }
}
