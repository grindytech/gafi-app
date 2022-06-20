import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import useEditPoolName from 'hooks/useEditPoolName';

export interface IEditPoolNameForm {
  poolName: string;
}

interface IModalEditPoolNameProps {
  onClose: () => void;
  poolId: string;
}

const EditPoolNameForm: React.FC<IModalEditPoolNameProps> = ({
  poolId,
  onClose,
}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditPoolNameForm>({
    defaultValues: {
      poolName: '',
    },
  });

  const requiredAmountMsg = t(
    'FIELD_NAME_MUST_BE_LONGER_THAN_MIN_AND_LESS_THAN_MAX_CHARACTERS',
    { fieldName: t('POOL_NAME'), min: 8, max: 32 }
  );

  const { editPoolName, isLoading } = useEditPoolName(() => {
    onClose();
  });

  return (
    <form
      onSubmit={handleSubmit((data: IEditPoolNameForm) => {
        editPoolName(data.poolName, poolId);
      })}
    >
      <FormControl isInvalid={!!errors.poolName} isRequired mb={4}>
        <FormLabel htmlFor="">{t('NAME')}</FormLabel>
        <Input
          id="poolName"
          type="text"
          {...register('poolName', {
            required: true,
            maxLength: {
              value: 32,
              message: requiredAmountMsg,
            },
            minLength: {
              value: 8,
              message: requiredAmountMsg,
            },
          })}
        />
      </FormControl>

      <ErrorMessage
        errors={errors}
        name="poolName"
        render={({ message }) => <Text color="red.500">{message} 😱</Text>}
      />
      <HStack justifyContent="flex-end">
        <Button
          type="submit"
          color="white"
          size="sm"
          px={8}
          variant="solid"
          isLoading={isLoading}
        >
          {t('SAVE')}
        </Button>
      </HStack>
    </form>
  );
};
export default EditPoolNameForm;
