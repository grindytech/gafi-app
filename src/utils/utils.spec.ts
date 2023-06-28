import { colors } from 'theme/theme';
import {
  CalculatorOfRarity,
  ColorOfRarity,
  convertHex,
  formatGAFI,
  shorten,
} from './utils';

/** 
  @function convertHex(color: string, opacity: number)
    - Ex: input = "#ffffff"
          opacity = 0.5
    - https://stackoverflow.com/a/7018987/16151303
    - summary:
        get position elements necessary 
        convert to 'base 16'
        the latest adding alpha  
*/
{
  const input = '#ffffff',
    opacity = 0.5,
    result = 'rgba(255, 255, 255, 0.5)';

  it(`convertHex(color, opacity) should to return ${result}`, () => {
    expect(convertHex(input, opacity)).toEqual(result);
  });
}

/** 
  @function shorten(hash: string, length: number)
    - Ex: hash = 6 (123n to 6) 
          length = 2
    - summary:
      get the length of input (hash)
      slice hash point start 0 that number will be revised 12 by input (hash)
      identifying where the middle needs "..." string now we've 12...
      step end slice at the point last with recipe "123456".slice(-length) result should be 56,
      right now, the compound we will have results equal 12..56
*/
{
  const input = {
    first: '123456',
    second: '11223344556677',
  };

  const length = 2;

  const result = {
    first: '12...56',
    second: '11...77',
  };

  it(`shorten(hash, length) should to return ${result.first} or ${result.second}`, () => {
    expect(shorten(input.first, length)).toEqual(result.first);
    expect(shorten(input.second, length)).toEqual(result.second);
  });
}

/** 
  @function formatGAFI(fee: number)
    - summary:
      using polkadot/utils to format  
*/
{
  const input = '1500000000000000000000',
    result = '1,500.0000';

  it(`formatGAFI(fee) should to equal ${result}`, () => {
    expect(formatGAFI(input)).toEqual(result);
  });
}

/** 
  @function ColorOfRarity(weight: number | string)
    - Ex: weight = {
          easy: 50
          medium: 25
          hard: 5
        }
    - summary:
      this callback checks if the weight is less than or equal to a unit, 
      including hard/medium/easy finally, return colors to distinguish levels of unit
*/
{
  const input = {
    easy: 50,
    medium: 25,
    hard: 5,
  };

  const result = {
    hard: colors.second.purple,
    medium: colors.second.orange,
    easy: colors.primary.a[500],
  };

  it(`ColorOfRarity(weight) should to return ${result.hard} or ${result.medium} or ${result.easy}`, () => {
    expect(ColorOfRarity(input.hard)).toBe(result.hard);
    expect(ColorOfRarity(input.medium)).toBe(result.medium);
    expect(ColorOfRarity(input.easy)).toBe(result.easy);
  });
}

/** 
  @function CalculatorOfRarity(weight: nunber: weights: number[])
    - Ex: weight 80
          weights = [40, 60]
    - summary:
      this callback calculator percent for weight
      first, we passed weight and a list of weights 
      recipe total = (weight / totalWeight) * 100 = result
        this logic is flexible when one of them changes it will change accordingly
      need to split them into 2 parts [left, right] "25.10000 || 10.23333 || 50.2333 || etc.."
      number is possible round so maybe 50 or 20 or 30 the good way is 
        if(right) ? total.toFixed(1) 'to round number' : prefix 'only show prefix' maybe 50 or 20 or 30 so round number is unnecessary
*/
{
  const input = {
    weight: [12, 24, 36, 48, 50],
  };

  const result = ['7.1', '14.1', '21.2', '28.2', '29.4'];

  it(`CalculatorOfRarity(weight, weights) should to return ${result}`, () => {
    input.weight.forEach((weight, index) => {
      expect(CalculatorOfRarity(weight, input.weight)).toEqual(result[index]);
    });
  });
}
