import { User } from './../interfaces/user';
import { AbilityBuilder, Ability } from '@casl/ability'

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

  return new Ability(rules)
}