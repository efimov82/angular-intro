import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  let pipe = new DurationPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Less 60 seconds', () => {
    let value = 15;
    let res = pipe.transform(value);

    expect(res == value.toString().concat(' sec.')).toBeTruthy();
  });

  it('Less 1 hour', () => {
    let value = 125;
    let res = pipe.transform(value);

    expect(res == '02:05').toBeTruthy();
  });

  it('Greater 1 hour', () => {
    let value = 3725;
    let res = pipe.transform(value);

    expect(res == '01:02:05').toBeTruthy();
  });
});
