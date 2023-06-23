import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

export type TypeSetValue = UseFormSetValue<
  Record<string, string | number | undefined>
>;

export type TypeRegister = UseFormRegister<any>;
