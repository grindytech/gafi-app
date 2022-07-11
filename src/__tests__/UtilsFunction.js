import {
  formatNumber,
  covertToContractValue,
  countDecimalPlaces,
  isNotNumber,
  toPrecision,
  cast,
  shorten,
} from 'utils';

describe('Utils function', () => {
  it('formatNumber', () => {
    const number = 19999;
    expect(formatNumber(number)).toBe('19,999');
  });

  it('covertToContractValue', () => {
    const value = {
      amount: 130,
      decimal: 18,
    };
    expect(covertToContractValue(value)).toBe('130000000000000000000');
  });

  it('countDecimalPlaces', () => {
    const value1 = 123;
    const value2 = 123.45;
    expect(countDecimalPlaces(value1)).toBe(0);
    expect(countDecimalPlaces(value2)).toBe(2);
  });

  it('isNotNumber', () => {
    const number1 = 9;
    const number2 = NaN;
    const number3 = 9 / 0;
    const number4 = 9 / 1;
    expect(isNotNumber(number1)).toBe(false);
    expect(isNotNumber(number2)).toBe(true);
    expect(isNotNumber(number3)).toBe(true);
    expect(isNotNumber(number4)).toBe(false);
  });

  it('toPrecision', () => {
    const number1 = 123.4567891011;
    const number2 = 0.9992232131221312;
    expect(toPrecision(number1, 4)).toBe('123.4567');
    expect(toPrecision(number2)).toBe('0.9992232131');
  });

  it('cast', () => {
    const number1 = 123.45;
    const number2 = 123.456789;
    const step = 0.005;
    const precision = 1;
    expect(cast(number1, step)).toBe('123.450');
    expect(cast(number2, step)).toBe('123.456789');
    expect(cast(number2, step, precision)).toBe('123.4');
    expect(cast(number1, step, precision)).toBe('123.4');
  });

  it('shorten', () => {
    const hash = '5C4iRto3HFF6mNFQDBDLD3N1rLv2fjJzUi6QGvtPFcUqhw4S';
    expect(shorten(hash, 4)).toBe('5C4i...hw4S');
    expect(shorten(hash)).toBe('5C4iRt...Uqhw4S');
  });
});
