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

import { NFTsFieldProps, NFTsFieldSetProps } from '.';
import NFTsAmount from './NFTsAmount';
import NFTsJohnCollection from './NFTsJohnCollection';
import { useEffect } from 'react';
import { validateLength } from 'utils/utils.validate';

interface CollectionsGeneralProps {
  register: UseFormRegister<NFTsFieldProps>;
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
  errors: FieldErrors<NFTsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

export default ({
  register,
  setValue,
  watch,
  errors,
  setRequired,
}: CollectionsGeneralProps) => {
  const fieldsSet: NFTsFieldSetProps[] = [
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
      label: 'NFT ID',
      fieldName: 'id',
      isRequired: true,
      isValue: true,
      form: (
        <Input
          variant="validate"
          placeholder="Ex: 0"
          {...register('id', {
            required: true,
            valueAsNumber: true,
          })}
        />
      ),
    },
    {
      label: 'Amount',
      fieldName: 'amount',
      form: <NFTsAmount register={register} setValue={setValue} />,
    },
    {
      label: 'Description',
      fieldName: 'description',
      isRequired: true,
      form: (
        <Textarea
          {...theme.components.Input.variants.validate.field}
          placeholder="Write about your NFT."
          resize="none"
          {...register('description')}
        />
      ),
    },
    {
      label: 'External URL',
      fieldName: 'external_url',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="https://songaming.vn"
          {...register('external_url', { required: true })}
        />
      ),
    },
    {
      label: 'Join collection',
      fieldName: 'john_collection',
      isRequired: true,
      form: <NFTsJohnCollection setValue={setValue} watch={watch} />,
    },
  ];

  const { name, id, description, external_url, john_collection } = watch();

  useEffect(() => {
    validateLength({
      watch,
      fieldsSet,
      setRequired,
      step: 0,
    });
  }, [name, id, description, external_url, john_collection]);

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
