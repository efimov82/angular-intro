import { Injectable } from '@angular/core';

import { ForbiddenError } from './forbidden.error';
import { Rule } from './rule.class';


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
      //subjectName,
      //originalRules: rules || [],
      //rules: rules,
      RuleType: [],
      subjectName: getSubjectName,
      originalRules: [],
      rules: [],
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
    const rule = this.relevantRuleFor(action, subject, field);

    return !!rule && !rule.inverted;
  }

  relevantRuleFor(action, subject, field) {
    const rules = this.rulesFor(action, subject, field);

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

function wrapArray(value) {
  return Array.isArray(value) ? value : [value];
}

function getSubjectName(subject) {
  if (!subject || typeof subject === 'string') {
    return subject;
  }

  let Type = undefined;
  if (typeof subject === 'object') {
    if (subject.modelName) {
      Type = subject.modelName;
    } else {
      Type = subject.constructor.name;
    }
  } else {
    Type = subject;
  }

  return Type;
}

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}