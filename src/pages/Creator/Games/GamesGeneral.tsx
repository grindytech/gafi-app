import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { GamesFieldProps, GamesFieldSetProps } from '.';

import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import theme from 'theme/theme';
import { useEffect } from 'react';
import GameGeneralCategories from './GameGeneralCategories';
import { validateLength } from 'utils/utils.validate';

interface GamesGeneralProps {
  register: UseFormRegister<GamesFieldProps>;
  setValue: UseFormSetValue<GamesFieldProps>;
  watch: UseFormWatch<GamesFieldProps>;
  errors: FieldErrors<GamesFieldProps>;
  setRequired: React.Dispatch<React.SetStateAction<Record<number, number>>>;
}

export default ({
  register,
  setValue,
  watch,
  errors,
  setRequired,
}: GamesGeneralProps) => {
  const fieldsSet: GamesFieldSetProps[] = [
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
      label: 'Categories',
      fieldName: 'category',
      isRequired: true,
      form: <GameGeneralCategories setValue={setValue} watch={watch} />,
    },
    {
      label: 'Description',
      fieldName: 'description',
      isRequired: true,
      form: (
        <Textarea
          {...theme.components.Input.variants.validate.field}
          placeholder="Write about your game."
          resize="none"
          {...register('description', { required: true })}
        />
      ),
    },
    {
      label: 'Website',
      fieldName: 'website',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="https://gafi.network"
          {...register('website', { required: true })}
        />
      ),
    },
    {
      label: 'Twitter',
      fieldName: 'twitter',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="https://twitter.com/gafi.network"
          {...register('twitter', { required: true })}
        />
      ),
    },
    {
      label: 'Discord',
      fieldName: 'discord',
      form: (
        <Input
          variant="validate"
          placeholder="https://gafi.network"
          {...register('discord')}
        />
      ),
    },
  ];

  const { name, category, description, website, twitter } = watch();

  useEffect(() => {
    validateLength({
      watch,
      fieldsSet,
      setRequired,
      step: 0,
    });
  }, [name, category, description, website, twitter]);

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
