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
import { NFTsFieldProps } from '..';
import NFTsAmount from '../NFTsAmount';
import NFTsJohnCollection from '../NFTsJohnCollection';

interface CollectionsGeneralProps {
  register: UseFormRegister<NFTsFieldProps>;
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
  errors: FieldErrors<NFTsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

interface fieldsSetProps {
  label: string;
  fieldName: keyof NFTsFieldProps;
  form: JSX.Element;
  isRequired?: boolean;
}

export default ({
  register,
  setValue,
  watch,
  errors,
  setRequired,
}: CollectionsGeneralProps) => {
  const fieldsSet: fieldsSetProps[] = [
    {
      label: 'NFT Title',
      fieldName: 'general_nft_title',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="Heroes & Empires"
          {...register('general_nft_title', { required: true })}
        />
      ),
    },
    {
      label: 'NFT ID',
      fieldName: 'general_nft_id',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="Ex: 0"
          {...register('general_nft_id', { required: true })}
        />
      ),
    },
    {
      label: 'Amount',
      fieldName: 'general_amount',
      form: <NFTsAmount register={register} setValue={setValue} />,
    },
    {
      label: 'Description',
      fieldName: 'general_description',
      isRequired: true,
      form: (
        <Textarea
          {...theme.components.Input.variants.validate.field}
          placeholder="Write about your NFT."
          resize="none"
          {...register('general_description')}
        />
      ),
    },
    {
      label: 'External URL',
      fieldName: 'general_external_url',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="https://songaming.vn"
          {...register('general_external_url', { required: true })}
        />
      ),
    },
    {
      fieldName: 'general_join_collection',
      label: 'Join collection',
      isRequired: true,
      form: <NFTsJohnCollection setValue={setValue} watch={watch} />,
    },
  ];

  const {
    general_nft_title,
    general_description,
    general_external_url,
    general_join_collection,
    general_nft_id,
  } = watch();

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
  }, [
    general_nft_title,
    general_nft_id,
    general_description,
    general_external_url,
    general_join_collection,
  ]);

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
