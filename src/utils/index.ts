import config from 'config';
import { formatBalance } from '@polkadot/util';
import { colors } from 'theme/theme';
import { TypeCollaboratorsRole } from 'layouts/Collaborators/CollaboratorsUtils';
import { chainDecimal } from './utils.contants';
import { InjectedWindowProvider } from 'types/polkadot.type';

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
  const result: InjectedWindowProvider = await window.injectedWeb3[extension];

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
  return fee.replace('.', '') + '0'.repeat(chainDecimal);
};

export const ColorOfRarity = (weight: number | string) => {
  const level = {
    none: 0,
    hard: 10,
    medium: 50,
    easy: 100,
  };

  // 'if' necessary sort orderby decremental
  if (Number(weight) <= level.none) return '#ffffff';
  if (Number(weight) <= level.hard) return colors.second.purple;
  if (Number(weight) <= level.medium) return colors.second.orange;
  if (Number(weight) <= level.easy) return colors.second.green;
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

export const ColorOfCollaborator = (type: TypeCollaboratorsRole): string => {
  if (type === 'Admin') return colors.primary.a[300];
  if (type === 'Freezer') return '#ffffff';
  if (type === 'Issuer') return '#ff7b00';

  return 'undefined';
};
