import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'HomeTimeFormat'
})

export class HomeTimeFormatPipe implements PipeTransform {
  transform (date: Date) {
    if (date) {
      return `${date.getHours()}:${date.getMinutes()}`;
    }
  }
}
