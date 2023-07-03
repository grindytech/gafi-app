import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
export type TypeReturnJSXElement = {
  [key: string]: () => JSX.Element;
};

export type TypeSetValue = UseFormSetValue<
  Record<string, string | number | undefined>
>;

export type TypeRegister = UseFormRegister<any>;
