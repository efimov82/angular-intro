export class ForbiddenError extends Error {
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