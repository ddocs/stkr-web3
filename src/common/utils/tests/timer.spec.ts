import { getTimerText } from '../timer';
import { intlInit } from '../intl';

intlInit();

describe('src/common/utils/timer', () => {
  it('Should show all fields', () => {
    expect(
      getTimerText({ days: 2, hours: 3, minutes: 4, seconds: 5, total: 123 }),
    ).toBe('2d 03h 04m 05s');
  });

  it('Should not fill days', () => {
    expect(
      getTimerText({ days: 0, hours: 3, minutes: 4, seconds: 5, total: 123 }),
    ).toBe('03h 04m 05s');
  });

  it('Should not fill hours', () => {
    expect(
      getTimerText({ days: 0, hours: 0, minutes: 4, seconds: 5, total: 123 }),
    ).toBe('04m 05s');
  });
  it('Should fill hours', () => {
    expect(
      getTimerText({ days: 2, hours: 0, minutes: 4, seconds: 5, total: 123 }),
    ).toBe('2d 00h 04m 05s');
  });

  it('Should not fill minutes', () => {
    expect(
      getTimerText({ days: 0, hours: 0, minutes: 0, seconds: 5, total: 123 }),
    ).toBe('05s');
  });
  it('Should fill minutes', () => {
    expect(
      getTimerText({ days: 0, hours: 1, minutes: 0, seconds: 5, total: 123 }),
    ).toBe('01h 00m 05s');
  });

  it('Should not fill seconds', () => {
    expect(
      getTimerText({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }),
    ).toBe('');
  });
  it('Should fill seconds', () => {
    expect(
      getTimerText({ days: 1, hours: 0, minutes: 0, seconds: 0, total: 123 }),
    ).toBe('1d 00h 00m 00s');
  });
});
