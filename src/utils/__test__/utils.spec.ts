import { colors } from 'theme/theme';
import {
  ColorOfCollaborator,
  ColorOfRarity,
  convertHex,
  formatCurrency,
  formatGAFI,
  shorten,
  unitGAFI,
} from 'utils';

describe('convertHex', () => {
  it('should return rgba(0, 0, 0, 1))', () => {
    expect(convertHex('#000000')).toBe('rgba(0, 0, 0, 1)');
  });

  it('should return rgba(0, 0, 0, 0.5))', () => {
    expect(convertHex('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
  });

  it('should return rgba(0, 0, 0, 0.25))', () => {
    expect(convertHex('#000000', 0.25)).toBe('rgba(0, 0, 0, 0.25)');
  });

  it('should return rgba(0, 0, 0, 0.01))', () => {
    expect(convertHex('#000000', 0.01)).toBe('rgba(0, 0, 0, 0.01)');
  });
});

describe('shorten', () => {
  it('should return 12...89', () => {
    expect(shorten('123456789', 2)).toBe('12...89');
  });

  it('should return 1...9', () => {
    expect(shorten('19', 1)).toBe('1...9');
  });

  it('should return 1...1', () => {
    expect(shorten('1', 1)).toBe('1...1');
  });
});

describe('formatGAFI', () => {
  it('should return 0.1', () => {
    expect(formatGAFI(1e9)).toBe('0.1');
  });

  it('should return 1', () => {
    expect(formatGAFI(1e10)).toBe('1');
  });

  it('should return 1,000', () => {
    expect(formatGAFI(1e13)).toBe('1,000');
  });

  it('should return 10,000', () => {
    expect(formatGAFI(1e14)).toBe('10,000');
  });
});

describe('formatCurrency', () => {
  it('should return $1,000.00', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('should return $100.00', () => {
    expect(formatCurrency(100)).toBe('$100.00');
  });

  it('should return $10.00', () => {
    expect(formatCurrency(10)).toBe('$10.00');
  });
});

describe('unitGAFI', () => {
  it('should return 1e9', () => {
    expect(unitGAFI('1')).toBe(`${Number(1e9)}0`); // last 0 of tobe mean value '1' (1 & 000...n)
  });
});

describe('ColorOfRarity', () => {
  it('should return #ffffff', () => {
    expect(ColorOfRarity(-1)).toBe('#ffffff');
  });

  it(`should return ${colors.second.purple}`, () => {
    expect(ColorOfRarity(5)).toBe(colors.second.purple);
  });

  it(`should return ${colors.second.orange}`, () => {
    expect(ColorOfRarity(25)).toBe(colors.second.orange);
  });

  it(`should return ${colors.second.green}`, () => {
    expect(ColorOfRarity(100)).toBe(colors.second.green);
  });
});

describe('ColorOfCollaborator', () => {
  it(`should return ${colors.primary.a[300]}`, () => {
    expect(ColorOfCollaborator('Admin')).toBe(colors.primary.a[300]);
  });

  it(`should return #ffffff`, () => {
    expect(ColorOfCollaborator('Freezer')).toBe('#ffffff');
  });

  it(`should return #ff7b00`, () => {
    expect(ColorOfCollaborator('Issuer')).toBe('#ff7b00');
  });
});
