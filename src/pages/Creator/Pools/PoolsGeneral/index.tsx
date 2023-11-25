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
import { PoolsFieldProps, PoolsFieldSetProps } from '..';
import PoolsDuration from './PoolsDuration';
import { useEffect } from 'react';
import { validateLength } from 'utils/utils.validate';

interface PoolsGeneralProps {
  register: UseFormRegister<PoolsFieldProps>;
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
  errors: FieldErrors<PoolsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

export default ({
  register,
  setValue,
  watch,
  errors,
  setRequired,
}: PoolsGeneralProps) => {
  const fieldsSet: PoolsFieldSetProps[] = [
    {
      label: 'Title',
      fieldName: 'title',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="Heroes & Empires"
          {...register('title', { required: true })}
        />
      ),
    },
    {
      label: 'Duration',
      fieldName: 'duration',
      isRequired: true,
      form: <PoolsDuration setValue={setValue} watch={watch} />,
    },
    {
      label: 'Description',
      fieldName: 'description',
      form: (
        <Textarea
          {...theme.components.Input.variants.validate.field}
          placeholder="Write about your pool."
          resize="none"
          {...register('description')}
        />
      ),
    },
  ];

  const { title, duration } = watch();

  useEffect(() => {
    validateLength({
      watch,
      fieldsSet,
      setRequired,
      step: 0,
    });
  }, [title, duration]);

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
