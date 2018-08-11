import { Ability } from '@app/permissions/classes';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'can',
  pure: false
})
export class CanPipe implements PipeTransform {

  constructor(private ability: Ability) { // private cd: ChangeDetectorRef
  }

  transform(resource, action, field) {
    return this.can(action, resource, field);
  }

  can(action, subject, field) {
    return this.ability.can(action, subject, field);
  }
}
