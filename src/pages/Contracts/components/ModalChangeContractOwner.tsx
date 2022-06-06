import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Button,
  useToast,
} from '@chakra-ui/react';
import { ISubmittableResult } from '@polkadot/types/types';
import { useState } from 'react';
import { useSubstrateState } from 'substrate-lib';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { getFromAcct, handleTxError } from 'components/utils';

interface IProps {
  contractChanging: string;
  onClose: () => void;
  refreshData: () => void;
}

interface IChangeOwnerForm {
  ownerAddress: string;
}

const ModalChangeContractOwner = (props: IProps) => {
  const { contractChanging, onClose, refreshData } = props;
  const toast = useToast();
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<IChangeOwnerForm>({
    defaultValues: {
      ownerAddress: '',
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
      refreshData();
      onClose();
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
    async (ownerAddress: string) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txChangeContractOwnerExecute = api?.tx.gameCreator.changeOwnership(
        contractChanging,
        ownerAddress
      );
      if (options) {
        return txChangeContractOwnerExecute?.signAndSend(
          account,
          options,
          txCallback
        ) as Promise<() => void>;
      }
      return txChangeContractOwnerExecute?.signAndSend(
        account,
        txCallback
      ) as Promise<() => void>;
    },
    {
      mutationKey: 'change-contract-onwer',
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

  const onSubmit = (data: IChangeOwnerForm) => {
    setIsLoading(true);
    mutation.mutate(data.ownerAddress);
  };

  return (
    <Modal
      isOpen={!!contractChanging}
      onClose={onClose}
      scrollBehavior="inside"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('CHANGE_CONTRACT_OWNER')}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl>
              <FormLabel>{t('OWNER_ADDRESS')}</FormLabel>
              <Input
                id="ownerAddress"
                type="text"
                {...register('ownerAddress', { required: true })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              background="primary"
              color="white"
              variant="solid"
              isLoading={isLoading}
            >
              {t('CHANGE')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalChangeContractOwner;
