interface ContractValueParams {
  amount: number;
  decimal?: number;
}

const trauncateFractionAndFormat = (
  parts: Intl.NumberFormatPart[],
  digits: number
) => {
  return parts
    .map(({ type, value }) => {
      if (type !== 'fraction' || !value || value.length < digits) {
        return value;
      }

      let retVal = '';
      for (
        let idx = 0, counter = 0;
        idx < value.length && counter < digits;
        idx++
      ) {
        if (value[idx] !== '0') {
          counter++;
        }
        retVal += value[idx];
      }
      return retVal;
    })
    .reduce((string, part) => string + part);
};

export const formatNumber = (num: number, digits?: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 20,
  });
  return trauncateFractionAndFormat(formatter.formatToParts(num), digits || 3);
};
export const covertToContractValue = ({
  amount,
  decimal = 18,
}: ContractValueParams) => {
  const strVal = '' + amount;
  const afterDot =
    strVal.indexOf('.') > -1 ? strVal.length - strVal.indexOf('.') - 1 : 0;
  const toInteger = strVal.replace('.', '');
  const returnVal = parseInt(toInteger) * 10 ** (decimal - afterDot);
  return returnVal.toLocaleString('fullwide', { useGrouping: false });
};
export const shorten = (hash: string, head?: number, tail?: number) => {
  const n = hash.length;
  return hash.slice(0, head || 10) + '…' + hash.slice(n - (tail || 6));
};

export function countDecimalPlaces(value: number): number {
  if (!Number.isFinite(value)) return 0;

  let e = 1;
  let p = 0;
  while (Math.round(value * e) / e !== value) {
    e *= 10;
    p += 1;
  }
  return p;
}

export function isNotNumber(value: any): boolean {
  return (
    typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)
  );
}

function toNumber(value: any) {
  const num = parseFloat(value);
  return isNotNumber(num) ? 0 : num;
}

export function toPrecision(value: number, precision?: number): string {
  let nextValue: string | number = toNumber(value);
  const scaleFactor = 10 ** (precision ?? 10);
  nextValue = Math.trunc(nextValue * scaleFactor) / scaleFactor;
  return precision ? nextValue.toFixed(precision) : nextValue.toString();
}

function parse(value: string | number) {
  return parseFloat(value.toString().replace(/[^\w.-]+/g, ''));
}

function getDecimalPlaces(value: number, step: number) {
  return Math.max(countDecimalPlaces(step), countDecimalPlaces(value));
}

export function cast(
  value: string | number,
  step: number,
  precision?: number
): string | undefined {
  const parsedValue = parse(value);
  if (Number.isNaN(parsedValue)) return undefined;
  const decimalPlaces = getDecimalPlaces(parsedValue, step);
  return toPrecision(parsedValue, precision ?? decimalPlaces);
}
