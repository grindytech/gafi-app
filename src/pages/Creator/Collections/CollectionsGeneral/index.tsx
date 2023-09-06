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
import CollectionsJohnGame from '../CollectionsJohnGame';
import { CollectionsFieldProps } from '..';

interface CollectionsGeneralProps {
  register: UseFormRegister<CollectionsFieldProps>;
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
  errors: FieldErrors<CollectionsFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

interface fieldsSetProps {
  label: string;
  fieldName: keyof CollectionsFieldProps;
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
      label: 'Collection tittle',
      fieldName: 'general_collection_title',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="Heroes & Empires"
          {...register('general_collection_title', { required: true })}
        />
      ),
    },
    {
      label: 'Description',
      fieldName: 'general_description',
      isRequired: true,
      form: (
        <Textarea
          {...theme.components.Input.variants.validate.field}
          placeholder="Write about your collection."
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
      label: 'Join game',
      fieldName: 'general_join_game',
      form: <CollectionsJohnGame watch={watch} setValue={setValue} />,
    },
  ];

  const {
    general_collection_title,
    general_description,
    general_external_url,
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
  }, [general_collection_title, general_description, general_external_url]);

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
