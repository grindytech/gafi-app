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
  isOpen: boolean;
  onClose: () => void;
  refreshData: () => void;
}

interface IClaimContractForm {
  contractAddress: string;
}

const ModalClaimContract = (props: IProps) => {
  const { isOpen, onClose, refreshData } = props;
  const toast = useToast();
  const { t } = useTranslation();
  const { api, currentAccount } = useSubstrateState();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<IClaimContractForm>({
    defaultValues: {
      contractAddress: '',
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
    async (contractAddress: string) => {
      const [account, options] = await getFromAcct(currentAccount);
      const txClaimContractExecute =
        api?.tx.gameCreator.claimContract(contractAddress);
      if (options) {
        return txClaimContractExecute?.signAndSend(
          account,
          options,
          txCallback
        ) as Promise<() => void>;
      }
      return txClaimContractExecute?.signAndSend(
        account,
        txCallback
      ) as Promise<() => void>;
    },
    {
      mutationKey: 'claim-contract',
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

  const onSubmit = (data: IClaimContractForm) => {
    setIsLoading(true);
    mutation.mutate(data.contractAddress);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('CLAIM_CONTRACT')}</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl>
              <FormLabel>{t('CONTRACT_ADDRESS')}</FormLabel>
              <Input
                id="contractAddress"
                type="text"
                {...register('contractAddress', { required: true })}
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
              {t('CLAIM')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalClaimContract;
