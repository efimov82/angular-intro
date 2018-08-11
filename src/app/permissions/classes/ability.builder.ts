import { RuleBuilder } from './rule.builder';

export class AbilityBuilder {
  rules: any;

  static extract() {
    const builder = new this();

    return {
      can: builder.can.bind(builder),
      cannot: builder.cannot.bind(builder),
      rules: builder.rules
    };
  }

  constructor() {
    this.rules = [];
  }

  can(actions, subject, conditionsOrFields, conditions) {
    if (!isStringOrNonEmptyArray(actions)) {
      throw new TypeError('AbilityBuilder#can expects the first parameter to be an action or array of actions');
    }

    if (!isStringOrNonEmptyArray(subject)) {
      throw new TypeError('AbilityBuilder#can expects the second argument to be a subject name or array of subject names');
    }

    const rule = { actions, subject, fields: null, conditions: null };

    if (Array.isArray(conditionsOrFields) || typeof conditionsOrFields === 'string') {
      rule.fields = conditionsOrFields;
    }

    if (isObject(conditions) || !rule.fields && isObject(conditionsOrFields)) {
      rule.conditions = conditions || conditionsOrFields;
    }

    this.rules.push(rule);

    return new RuleBuilder(rule);
  }

  cannot(actions, subject, conditionsOrFields, conditions) {
    const builder = this.can(actions, subject, conditionsOrFields, conditions);
    builder.rule.inverted = true;

    return builder;
  }
}


function isStringOrNonEmptyArray(value) {
  return typeof value === 'string' || Array.isArray(value) && value.length > 0;
}

function isObject(value) {
  return value && typeof value === 'object';
}