import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { GamesFieldProps, fieldsSetProps } from '.';

import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import theme from 'theme/theme';
import { useEffect } from 'react';
import GameGeneralCategories from './GameGeneralCategories';

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
  const fieldsSet: fieldsSetProps[] = [
    {
      label: 'Game tittle',
      fieldName: 'general_game_title',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="Heroes & Empires"
          {...register('general_game_title', { required: true })}
        />
      ),
    },
    {
      label: 'Categories',
      fieldName: 'general_categories',
      isRequired: true,
      form: <GameGeneralCategories setValue={setValue} watch={watch} />,
    },
    {
      label: 'Description',
      fieldName: 'general_description',
      form: (
        <Textarea
          {...theme.components.Input.variants.validate.field}
          placeholder="Write about your game."
          resize="none"
          {...register('general_description')}
        />
      ),
    },
    {
      label: 'Website',
      fieldName: 'general_website',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="https://gafi.network"
          {...register('general_website')}
        />
      ),
    },
    {
      label: 'Twitter',
      fieldName: 'general_twitter',
      isRequired: true,
      form: (
        <Input
          variant="validate"
          placeholder="https://twitter.com/gafi.network"
          {...register('general_twitter')}
        />
      ),
    },
    {
      label: 'Discord',
      fieldName: 'general_discord',
      form: (
        <Input
          variant="validate"
          placeholder="https://gafi.network"
          {...register('general_discord')}
        />
      ),
    },
  ];

  const {
    general_game_title,
    general_categories,
    general_website,
    general_twitter,
  } = watch();

  useEffect(() => {
    const fieldsRequired = () => {
      /* 
        Find every field contains the required
        Check 'fieldName' of the watch is not None, that should length >= 1
        so length = 0, this means you can next step
        Ex: 
          isRequired = [true, true, true]
          fieldName = ['something', 'something']
          result = [true true] 
      */
      const findRequired = fieldsSet.filter(
        meta => meta.isRequired && !watch()[meta.fieldName]
      );

      return findRequired.length;
    };

    setRequired({
      0: fieldsRequired(),
    });
  }, [
    general_game_title,
    general_categories,
    general_website,
    general_twitter,
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
