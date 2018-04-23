import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'ServerTimeFormat'
})

export class ServerTimeFormatPipe implements PipeTransform {
  transform (date: Date) {
    if (date) {
      return `${date.getUTCHours()}:${date.getMinutes()}`;
    }
  }
}
