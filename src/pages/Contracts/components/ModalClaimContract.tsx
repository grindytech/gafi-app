import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import useClaimContract from 'hooks/useClaimContract';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IClaimContractForm {
  contractAddress: string;
}

const ModalClaimContract = ({ isOpen, onClose }: IProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<IClaimContractForm>({
    defaultValues: {
      contractAddress: '',
    },
  });

  const { claimContract, isLoading } = useClaimContract(() => {
    onClose();
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('CLAIM_CONTRACT')}</ModalHeader>
        <form
          onSubmit={handleSubmit(data => {
            claimContract(data.contractAddress);
          })}
        >
          <ModalBody>
            <FormControl isRequired>
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
              size="sm"
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
