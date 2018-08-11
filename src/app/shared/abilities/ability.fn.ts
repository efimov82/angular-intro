import { User } from './../interfaces/user';
import { Ability, AbilityBuilder } from '@app/permissions/classes';

export enum USER_ROLES {
  GUEST = 'guest',
  USER = 'user',
  MANAGER = 'manager',
  ADMIN = 'admin',
};

export function defineAbilityFor(user: User) {
  const { rules, can, cannot } = AbilityBuilder.extract()

  switch (user.roles) {
    case USER_ROLES.ADMIN:
      can(['create', 'update', 'delete'], 'Course');
      break;
    case USER_ROLES.MANAGER:
      can(['create', 'update', 'delete'], 'Course');
    break;
    case USER_ROLES.USER:
      can('create', 'Course');
      can(['update', 'delete'], 'Course', { ownerId: user.id });
      break;
    //case USER_ROLES.GUEST:
    default:
      break;
  }
  console.log(rules);

  const ab = new Ability();
  ab.update(rules);

  return ab;
}