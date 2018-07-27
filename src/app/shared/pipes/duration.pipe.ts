import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    minutes = Math.floor(value / 60);
    seconds = (value - minutes * 60);
    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes = minutes - Math.floor(minutes / 60) * 60;
    }

    return `${hours.toString().padStart(2, '0')}:
            ${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}`;
  }
}
