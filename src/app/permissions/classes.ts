import { Injectable } from '@angular/core';
import sift from 'sift';

class ForbiddenError extends Error {
  subject: any
  subjectName: string
  action: string
  field: string

  constructor(message: string, options: any = {}) {
    super();

    const subject = options.subject;
    const subjectName = options.subjectName;
    const action = options.action;
    const field = options.field;
    message = message || `Cannot execute "${action}" on "${subjectName}"`;
  }
}


function wrapArray(value) {
  return Array.isArray(value) ? value : [value];
}

class Rule {
  actions: any;
  subject: any;
  fields
  inverted: boolean;
  conditions: any;
  reason: any;
  _matches: any;

  constructor(params) {
    this.actions = params.actions || params.action;
    this.subject = params.subject;
    this.fields = !params.fields || params.fields.length === 0 ? undefined : wrapArray(params.fields);
    this.inverted = !!params.inverted;
    this.conditions = params.conditions;
    this._matches = this.conditions ? sift(this.conditions) : undefined;
    this.reason = params.reason;
  }

  matches(object) {
    if (!this._matches) {
      return true;
    }

    if (typeof object === 'string') {
      return !this.inverted;
    }

    return this._matches(object);
  }

  isRelevantFor(object, field) {
    if (!this.fields) {
      return true;
    }

    if (!field) {
      return !this.inverted;
    }

    return this.fields.indexOf(field) !== -1;
  }
}

function getSubjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  const Type = typeof subject === 'object' ? subject.constructor : subject;

  return Type.modelName || Type.name;
}

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

const DEFAULT_ALIASES = {
  manage: ['create', 'read', 'update', 'delete']
};

const PRIVATE_FIELD = typeof Symbol !== 'undefined' ? Symbol('private') : `__${Date.now()}`;


@Injectable({
  providedIn: 'root'
})
export class Ability {
  static addAlias(alias, actions) {
    if (alias === actions || Array.isArray(actions) && actions.indexOf(alias) !== -1) {
      throw new Error(`Attempt to alias action to itself: ${alias} -> ${actions.toString()}`);
    }

    DEFAULT_ALIASES[alias] = actions;
    return this;
  }

  constructor() { // rules: any = [], { RuleType = Rule, subjectName = getSubjectName } = {}
    this[PRIVATE_FIELD] = {
      //RuleType,
      // subjectName,
      // originalRules: rules || [],
      // rules: rules,
      RuleType: [],
      subjectName: getSubjectName,
      originalRules: [],
      rules: {},
      events: {},
      aliases: clone(DEFAULT_ALIASES)
    };
    // this.update([rules]);
  }

  update(rules) {
    if (Array.isArray(rules)) {
      const payload = { rules, ability: this };

      this.emit('update', payload);
      this[PRIVATE_FIELD].originalRules = Object.freeze(rules.slice(0));
      this[PRIVATE_FIELD].rules = this.buildIndexFor(this.rules);
      this.emit('updated', payload);
    }

    return this;
  }

  buildIndexFor(rules) {
    const indexedRules = {};
    // const { RuleType } = this[PRIVATE_FIELD];

    for (let i = 0; i < rules.length; i++) {
      const rule = new Rule(rules[i]);
      const actions = this.expandActions(rule.actions);
      const subjects = wrapArray(rule.subject);

      for (let k = 0; k < subjects.length; k++) {
        const subject = subjects[k];
        indexedRules[subject] = indexedRules[subject] || {};

        for (let j = 0; j < actions.length; j++) {
          const action = actions[j];
          indexedRules[subject][action] = indexedRules[subject][action] || [];
          indexedRules[subject][action].unshift(rule);
        }
      }
    }

    return indexedRules;
  }

  expandActions(rawActions) {
    const actions = wrapArray(rawActions);
    const { aliases } = this[PRIVATE_FIELD];

    return actions.reduce((expanded, action) => {
      if (aliases.hasOwnProperty(action)) {
        return expanded.concat(this.expandActions(aliases[action]));
      }

      return expanded;
    }, actions);
  }

  get rules() {
    return this[PRIVATE_FIELD].originalRules;
  }

  can(action, subject, field) {
    console.log(action, subject, field);

    const rule = this.relevantRuleFor(action, subject, field);

    return !!rule && !rule.inverted;
  }

  relevantRuleFor(action, subject, field) {
    const rules = this.rulesFor(action, subject, field);
    console.log(rules);

    for (let i = 0; i < rules.length; i++) {
      if (rules[i].matches(subject)) {
        return rules[i];
      }
    }

    return null;
  }

  possibleRulesFor(action, subject) {
    const subjectName = this[PRIVATE_FIELD].subjectName(subject);
    const { rules } = this[PRIVATE_FIELD];
    const specificRules = rules.hasOwnProperty(subjectName) ? rules[subjectName][action] : null;
    const generalRules = rules.hasOwnProperty('all') ? rules.all[action] : null;

    return (specificRules || []).concat(generalRules || []);
  }

  rulesFor(action, subject, field) {
    return this.possibleRulesFor(action, subject).filter(rule => rule.isRelevantFor(subject, field));
  }

  cannot(action, subject, field) {
    return !this.can(action, subject, field);
  }

  throwUnlessCan(action, subject, field) {
    const rule = this.relevantRuleFor(action, subject, field);

    if (!rule || rule.inverted) {
      // const [action, subject, field] = args;
      const subjectName = this[PRIVATE_FIELD].subjectName(subject);

      throw new ForbiddenError(rule ? rule.reason : null, {
        action,
        subjectName,
        subject,
        field
      });
    }
  }

  on(event, handler) {
    const { events } = this[PRIVATE_FIELD];
    let isAttached = true;

    if (!events[event]) {
      events[event] = [];
    }

    events[event].push(handler);

    return () => {
      if (isAttached) {
        const index = events[event].indexOf(handler);
        events[event].splice(index, 1);
        isAttached = false;
      }
    };
  }

  emit(event, payload) {
    const handlers = this[PRIVATE_FIELD].events[event];

    if (handlers) {
      handlers.forEach(handler => handler(payload));
    }
  }
}

function isStringOrNonEmptyArray(value) {
  return typeof value === 'string' || Array.isArray(value) && value.length > 0;
}

function isObject(value) {
  return value && typeof value === 'object';
}

class RuleBuilder {
  rule: any;

  constructor(rule) {
    this.rule = rule;
  }

  because(reason) {
    this.rule.reason = reason;
    return this;
  }
}

class AbilityBuilder {
  rules: any;

  // static define(params, dsl) {
  //   const options = typeof params === 'function' ? {} : params;
  //   const define = params === options ? dsl : params;
  //   const builder = new this();
  //   const result = define(builder.can.bind(builder), builder.cannot.bind(builder));
  //   //const Ability = new Ability();
  //   const buildAbility = () => new Ability(); //new Ability(builder.rules, options);

  //   return result && typeof result.then === 'function' ? result.then(buildAbility) : buildAbility();
  // }

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

export { Rule, RuleBuilder, AbilityBuilder, ForbiddenError }; // Ability,
