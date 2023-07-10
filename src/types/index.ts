import { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form';
export type TypeReturnJSXElement = {
  [key: string]: () => JSX.Element;
};

// react-hook-form
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
  placeholder?: string;
  title: string; // Title of Label
  value: string; // Value of Register
};

// substrate
export type TypeMetadataOfCollection =
  | {
      description: string;
      external_url: string;
      image: string;
      title: string;
    }
  | undefined;

export type TypeMetadataOfItem =
  | {
      description: string;
      external_url: string;
      image: string;
      title: string;
    }
  | undefined;
