export class RuleType {
  actions: any;
  subject: any;
  conditionsOrFields: any
  conditions: any;

  constructor(rule: any) {
    this.actions = rule.actions;
    this.subject = rule.subject;
    this.conditions = rule.conditions;
    this.conditionsOrFields = rule.conditionsOrFields
  }
}