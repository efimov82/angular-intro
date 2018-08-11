export class RuleBuilder {
  rule: any;

  constructor(rule) {
    this.rule = rule;
  }

  because(reason) {
    this.rule.reason = reason;
    return this;
  }
}