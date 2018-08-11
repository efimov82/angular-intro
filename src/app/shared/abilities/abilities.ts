// import { abilityUser } from './abilities';
// import { Course } from '@shared/models/course.model';
//import { AbilityBuilder } from '@casl/ability'

// export const abilityGuest = AbilityBuilder.define(can => {
//   can('read', 'all')
// });

// export const abilityUser = AbilityBuilder.define((can) => {
//   console.log(can);

//   can('read', 'all')
//   can(['create'], Course)
//   can(['update'], Course, { ownerId: '5b5f7334c6a4773f8e8e08fe' })
// });

// export const abilityManager = AbilityBuilder.define(can => {
//   can('read', 'all')
//   can('create', Course)
//   can(['update'], 'Course', { owner: 'me' })
// });

// export const abilityAdmin = AbilityBuilder.define(can => {
//   can('read', 'all')
//   can(['create', 'update', 'delete'], Course)
// })
