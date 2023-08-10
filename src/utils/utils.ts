import config from 'config';
import { chainDecimal } from './constants';
import { formatBalance } from '@polkadot/util';
import { colors } from 'theme/theme';

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
export const convertHex = (color: string, opacity: number) => {
  const hexColorToRGBA = `${parseInt(color.substring(1, 3), 16)}, ${parseInt(
    color.substring(3, 5),
    16
  )}, ${parseInt(color.substring(5, 7), 16)}, ${opacity}`;

  return `rgba(${hexColorToRGBA})`;
};

/** 
  @function shorten(hash: string, length: number)
    - Ex: hash = 6 (123n to 6) 
          length = 2

    - summary:
      get length of input (hash)
      slice hash point start 0 that number will reviced 12 by input (hash)
      identifying where middle it needs "..." string now we've 12...
      step end slice at point last with recipe "123456".slice(-length) result should to be 56,
      right now, compound we will have result equal 12..56
*/
export const shorten = (hash: string, length = 6) => {
  const prefix = hash.slice(0, length);
  const middle = '...';
  const suffixed = hash.slice(-length);

  return prefix + middle + suffixed;
};

export const getInjectedWeb3 = async (extension: string) => {
  const result = await window.injectedWeb3[extension];

  if (result.enable) {
    return result.enable(config.APP_NAME);
  }
};

export const formatGAFI = (fee: Parameters<typeof formatBalance>[0]) => {
  const formatNumber = formatBalance(fee, {
    withSi: false,
    forceUnit: '-',
    decimals: chainDecimal,
    withZero: false,
  });

  return formatNumber;
};

export const formatCurrency = (value: number, currency?: string) => {
  return Intl.NumberFormat(undefined, {
    style: 'currency',
    currencyDisplay: 'narrowSymbol',
    currency: currency || 'usd',
  }).format(value);
};

export const unitGAFI = (fee: string) => {
  const shouldZeroFirst = fee.startsWith('0.');

  return shouldZeroFirst
    ? fee.replace('.', '') + '0'.repeat(14)
    : fee.replace('.', '') + '0'.repeat(chainDecimal);
};

/**
 * @type (Parameters<typeof formatBalance>[0], number | string, boolean)
 * @param (get_balance = 2555000000000000000000, amount_multiply = 2, true)
 * @description
 * 1. get get_balance and convert to number (2,555 = 2555)
 * 2. sum by multiply with get_balance and amount_multiply (2555 * 2 = 5110)
 * 3. convert to unit GAFI (5110 = 5110000000000000000000)
 * 4. convert unit GAFI to format short (5,110)
 */
export function sumGAFI(
  get_balance: Parameters<typeof formatBalance>[0],
  amount_multiply: number | string,
  replace?: boolean
): string | number {
  const balance_to_number = formatGAFI(get_balance).replaceAll(',', ''); // 2,555 = 2555
  const calculate_sum = Number(balance_to_number) * Number(amount_multiply);
  const convert_to_unitGAFI = unitGAFI(String(calculate_sum));

  if (replace) {
    return formatGAFI(convert_to_unitGAFI).replaceAll(',', '');
  }

  return formatGAFI(convert_to_unitGAFI);
}

export const ColorOfRarity = (weight: number | string) => {
  const easy = 100;
  const medium = 35;
  const hard = 10;

  if (Number(weight) <= hard) return colors.second.purple;
  if (Number(weight) <= medium) return colors.second.orange;
  if (Number(weight) <= easy) return colors.primary.a[500];
};

export const CalculatorOfRarity = (weight: number, weights: number[]) => {
  const totalWeight = weights
    .map(item => Number(item))
    .reduce((prev, current) => prev + current);

  const numberIsNotRound = weight >= 1;

  const calculatorTotal = numberIsNotRound
    ? String((weight / totalWeight) * 100)
    : '0';

  const [prefix, suffixed] = calculatorTotal.split('.');

  return suffixed ? Number(calculatorTotal).toFixed(1) : prefix;
};
