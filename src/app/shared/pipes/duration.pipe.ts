import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let hours = '';
    let minutes = 0;
    let seconds = '';

    if (value < 60) {
      return value + ' sec.';
    }

    minutes = Math.floor(value / 60);
    seconds = (value - minutes * 60).toString().padStart(2, '0');
    if (minutes > 60) {
      hours = Math.floor(minutes / 60).toString().padStart(2, '0') + ':';
      minutes = minutes - Math.floor(minutes / 60) * 60;
    }

    return `${hours}${minutes.toString().padStart(2, '0')}:
          ${seconds.toString().padStart(2, '0')}`;
  }
}
