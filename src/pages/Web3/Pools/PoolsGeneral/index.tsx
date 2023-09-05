import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import theme from 'theme/theme';
import { PoolsFieldProps } from '..';
import PoolsDuration from '../PoolsDuration';
import { useEffect } from 'react';

interface PoolsGeneralProps {
  register: UseFormRegister<PoolsFieldProps>;
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  errors: FieldErrors<PoolsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

interface fieldsSetProps {
  label: string;
  fieldName: keyof PoolsFieldProps;
  form: JSX.Element;
  isRequired?: boolean;
}

export default ({
  register,
  setValue,
  watch,
  errors,
  setRequired,
}: PoolsGeneralProps) => {
  const fieldsSet: fieldsSetProps[] = [
    {
      label: 'Pool title',
      fieldName: 'general_title',
      form: (
        <Input
          variant="validate"
          placeholder="Heroes & Empires"
          {...register('general_title', { required: true })}
        />
      ),
    },
    {
      label: 'Duration',
      fieldName: 'general_duration',
      isRequired: true,
      form: <PoolsDuration setValue={setValue} watch={watch} />,
    },
    {
      label: 'Description',
      fieldName: 'general_description',
      form: (
        <Textarea
          {...theme.components.Input.variants.validate.field}
          placeholder="Write about your pool."
          resize="none"
          {...register('general_description')}
        />
      ),
    },
  ];

  const { general_type, general_duration } = watch();

  useEffect(() => {
    const fieldsRequired = () => {
      const findRequired = fieldsSet.filter(
        meta => meta.isRequired && !watch()[meta.fieldName]
      );

      return findRequired.length;
    };

    setRequired({
      0: fieldsRequired(),
    });
  }, [general_type, general_duration]);

  return fieldsSet.map(meta => (
    <FormControl isInvalid={!!errors[meta.fieldName]} key={meta.fieldName}>
      <FormLabel fontSize="sm" fontWeight="medium" color="shader.a.400">
        {meta.label}

        {meta.isRequired && (
          <Text as="span" color="primary.a.400" fontWeight="medium">
            &nbsp;*
          </Text>
        )}
      </FormLabel>

      {meta.form}
    </FormControl>
  ));
};
