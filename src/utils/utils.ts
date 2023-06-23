import config from 'config';
import { GAFI_WALLET_STORAGE_KEY, chainDecimal } from './constants';
import { formatBalance } from '@polkadot/util';
import { colors } from 'theme/theme';

export const convertHex = (color: string, opacity: number) => {
  /* 
    - https://stackoverflow.com/a/7018987/16151303
    - logic summary:
        get position elements necessary 
        convert to 'base 16'
        the latest adding alpha  
  */
  const hexColorToRGBA = `
      ${parseInt(color.substring(1, 3), 16)},
      ${parseInt(color.substring(3, 5), 16)},
      ${parseInt(color.substring(5, 7), 16)}, ${opacity}`;

  return `rgba(${hexColorToRGBA})`;
};

export const shorten = (hash: string, length = 6) => {
  const n = hash.length;
  return hash.slice(0, length) + '…' + hash.slice(n - length);
};

export const getInjectedWeb3 = async () => {
  const extensionName = localStorage.getItem(GAFI_WALLET_STORAGE_KEY);

  if (extensionName) {
    const result = await window.injectedWeb3[extensionName].enable(
      config.APP_NAME
    );

    return result;
  }
};

export const formatGAFI = (fee: number) => {
  const formatNumber = formatBalance(
    fee,
    {
      withSi: false,
      forceUnit: '-',
    },
    chainDecimal
  );

  return formatNumber;
};

export const ColorOfRarity = (weight: number | string) => {
  const hard = 0;
  const medium = 25;
  const easy = 50;

  if (Number(weight) >= easy) return colors.primary.a[500];
  if (Number(weight) >= medium) return colors.second.orange;
  if (Number(weight) >= hard) return colors.second.purple;
};

export const CalculatorOfRarity = (weight: number, weights: number[]) => {
  const totalWeight = weights
    .map(item => Number(item))
    .reduce((prev, current) => prev + current);

  const shouldNotNaN = weight >= 1;

  const calculatorTotal = shouldNotNaN
    ? String((weight / totalWeight) * 100)
    : '0';

  const [prefix, suffixed] = calculatorTotal.split('.');

  return suffixed ? Number(calculatorTotal).toFixed(1) : prefix;
};
