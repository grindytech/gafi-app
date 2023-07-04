import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';

export type TypeSetValue = UseFormSetValue<
  Record<string, string | number | undefined>
>;

export type TypeRegister = UseFormRegister<any>;

export type TypeControl = Control<any, any>;

export type TypeNumberInput = {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<Record<string, string | number | undefined>>;
  control: TypeControl;
  isInvalid?: boolean;
  isRequired?: boolean;
  title: string; // Title of Label
  value: string; // Value of Register
};
