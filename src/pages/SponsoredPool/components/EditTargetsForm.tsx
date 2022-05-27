import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { mdiClose, mdiPlus } from '@mdi/js';
import { ISubmittableResult } from '@polkadot/types/types';
import { getFromAcct, handleTxError } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';
import { t } from 'i18next';
import { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { AddressOrPair, SignerOptions } from '@polkadot/api/types';
import { useMutation } from 'react-query';

interface IEditTargetsForm {
  targets: { contractAddress: string }[];
}

interface IRequestData {
  newTargets: string[];
  account: AddressOrPair;
  options?: Partial<SignerOptions>;
}

interface IModalEditTargesProps {
  poolId: string;
  targets: string[];
}

type ITargets = {
  contractAddress: string;
}[];

const EditTargetsForm: React.FC<IModalEditTargesProps> = ({
  poolId,
  targets,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();

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

  const txCallback = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('FINALIZED_BLOCK_HASH', {
          hash: status.asFinalized.toString(),
        }),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
    } else {
      toast({
        description: t('CURRENT_TRANSACTION_STATUS', {
          statusType: status.type,
        }),
        isClosable: true,
        status: 'info',
      });
    }
  };

  const mutation = useMutation(
    async (targetsData: ITargets) => {
      const [account, options] = await getFromAcct(currentAccount);
      const newTargets = targetsData.map(target => target.contractAddress);
      const txSetNewTargets = api?.tx.sponsoredPool.newTargets(
        poolId,
        newTargets
      );
      if (options) {
        return txSetNewTargets?.signAndSend(
          account,
          options,
          txCallback
        ) as Promise<() => void>;
      }
      return txSetNewTargets?.signAndSend(account, txCallback) as Promise<
        () => void
      >;
    },
    {
      mutationKey: 'update-target-contract',
      onError: (error: any) => {
        toast({
          description: t('TRANSACTION_FAILED', {
            errorMessage: error.toString(),
          }),
          isClosable: true,
          status: 'error',
        });
        setIsLoading(false);
      },
    }
  );

  const onSubmit = async (data: IEditTargetsForm) => {
    setIsLoading(true);
    mutation.mutate(data.targets);
  };

  const { fields, remove, append } = useFieldArray<IEditTargetsForm>({
    control,
    name: 'targets',
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.targets} isRequired mb={4}>
        <FormLabel htmlFor="">{t('TARGETS')}</FormLabel>
        <VStack alignItems="flex-start">
          {fields.map((field, index) => (
            <InputGroup>
              <Input
                key={field.id}
                type="text"
                {...register(`targets.${index}.contractAddress` as const, {
                  required: t('FIELD_CANNOT_BE_LEFT_BLANK').toString(),
                })}
              />
              <InputRightElement
                display={fields.length === 1 ? 'none' : 'block'}
              >
                <IconButton
                  onClick={() => remove(index)}
                  colorScheme="red"
                  aria-label="remove target"
                  icon={
                    <Icon>
                      <path fill="currentColor" d={mdiClose} />
                    </Icon>
                  }
                />
              </InputRightElement>
            </InputGroup>
          ))}
        </VStack>
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
          background="primary"
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
