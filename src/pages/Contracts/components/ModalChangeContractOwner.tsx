import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import useChangeOwner from 'hooks/useChangeOwner';

interface IProps {
  contractAddress: string;
  onClose: () => void;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IChangeOwnerForm {
  ownerAddress: string;
}

const ModalChangeContractOwner = (props: IProps) => {
  const { contractAddress, onClose, setIsPending } = props;
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm<IChangeOwnerForm>({
    defaultValues: {
      ownerAddress: '',
    },
  });

  const { changeOwner, isLoading } = useChangeOwner(() => {
    onClose();
  }, setIsPending);

  return (
    <Modal
      isOpen={!!contractAddress}
      onClose={onClose}
      scrollBehavior="inside"
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('CHANGE_CONTRACT_OWNER')}</ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={handleSubmit(data => {
            changeOwner(contractAddress, data.ownerAddress);
          })}
        >
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
              size="sm"
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
