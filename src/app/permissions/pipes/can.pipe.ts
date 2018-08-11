import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { Ability } from '@app/permissions/classes';

//const noop = () => {};

@Pipe({
  name: 'can',
  pure: false
})
export class CanPipe implements PipeTransform {
  //unsubscribeFromAbility: any;

  constructor(private ability: Ability) { // private cd: ChangeDetectorRef
    // this.ability = new Ability();
    // this.ability = ability;
    // this.cd = cd;
    // this.unsubscribeFromAbility = noop;
  }

  transform(resource, action, field) {
    // if (this.unsubscribeFromAbility === noop) {
    //   this.unsubscribeFromAbility = this.ability.on('updated', () => this.cd.markForCheck());
    // }

    return this.can(action, resource, field);
  }

  can(action, subject, field) { // ...args
    return this.ability.can(action, subject, field); // ...args
  }

  ngOnDestroy() {
    // this.unsubscribeFromAbility();
  }

}
