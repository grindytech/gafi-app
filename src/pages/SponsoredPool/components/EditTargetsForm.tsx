import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Text,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { mdiPlus } from '@mdi/js';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import TargetFields from 'components/TargetFields';
import usePoolActions from 'hooks/usePoolActions';

export interface IEditTargetsForm {
  targets: { contractAddress: string }[];
}

interface IModalEditTargesProps {
  poolId: string;
  targets: string[];
  onClose: () => void;
}

export type ITargets = {
  contractAddress: string;
}[];

const EditTargetsForm: React.FC<IModalEditTargesProps> = ({
  onClose,
  poolId,
  targets,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const currentTargets = useMemo(
    () =>
      targets.map(target => ({
        contractAddress: target,
      })),
    [targets]
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEditTargetsForm>({
    defaultValues: {
      targets: currentTargets,
    },
  });

  const { fields, remove, append } = useFieldArray<IEditTargetsForm>({
    control,
    name: 'targets',
  });

  const { editPoolTargets, isLoading, isDone } = usePoolActions();

  useEffect(() => {
    if (isDone === true) {
      onClose();
      history.push('/admin/sponsored-pool?type=owned');
    }
  }, [isDone]);

  return (
    <form
      onSubmit={handleSubmit((data: IEditTargetsForm) => {
        editPoolTargets(data, poolId);
      })}
    >
      <FormControl isInvalid={!!errors.targets} isRequired mb={4}>
        <FormLabel htmlFor="">{t('TARGETS')}</FormLabel>
        <TargetFields fields={fields} remove={remove} register={register} />
      </FormControl>
      <ErrorMessage
        errors={errors}
        name="poolName"
        render={({ message }) => <Text color="red.500">{message} 😱</Text>}
      />
      <Button
        display="block"
        disabled={fields.length >= 5}
        onClick={() => append({ contractAddress: '' })}
        variant="primary"
        size="sm"
        leftIcon={
          <Icon>
            <path fill="currentColor" d={mdiPlus} />
          </Icon>
        }
      >
        {t('ADD_TARGETS')}
      </Button>

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

export default EditTargetsForm;
