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

import { useEffect } from 'react';
import CollectionsJohnGame from './CollectionsJohnGame';
import { CollectionsFieldProps, CollectionsFieldSetProps } from '.';
import { validateLength } from 'utils/utils.validate';

interface CollectionsGeneralProps {
  register: UseFormRegister<CollectionsFieldProps>;
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
  errors: FieldErrors<CollectionsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

export default ({
  register,
  setValue,
  watch,
  errors,
  setRequired,
}: CollectionsGeneralProps) => {
  const fieldsSet: CollectionsFieldSetProps[] = [
    {
      label: 'Name',
      fieldName: 'name',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="Heroes & Empires"
          {...register('name', { required: true })}
        />
      ),
    },
    {
      label: 'Description',
      fieldName: 'description',
      isRequired: true,
      form: (
        <Textarea
          {...theme.components.Input.variants.validate.field}
          placeholder="Write about your collection."
          resize="none"
          {...register('description')}
        />
      ),
    },
    {
      label: 'External URL',
      fieldName: 'external_url',
      form: (
        <Input
          variant="validate"
          placeholder="https://songaming.vn"
          {...register('external_url')}
        />
      ),
    },
    {
      label: 'Join game',
      fieldName: 'john_game',
      form: <CollectionsJohnGame watch={watch} setValue={setValue} />,
    },
  ];

  const { name, description } = watch();

  useEffect(() => {
    validateLength({
      watch,
      fieldsSet,
      setRequired,
      step: 0,
    });
  }, [name, description]);

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
