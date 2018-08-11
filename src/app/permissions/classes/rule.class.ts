import sift from 'sift';

export class Rule {
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

function wrapArray(value) {
  return Array.isArray(value) ? value : [value];
}