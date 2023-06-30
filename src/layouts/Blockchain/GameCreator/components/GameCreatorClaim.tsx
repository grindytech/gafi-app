import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  useDisclosure,
} from '@chakra-ui/react';
import LineAddIcon from 'public/assets/line/add.svg';
import { useForm } from 'react-hook-form';

import { NumberInputStyle } from 'components/NumberInput';
import useSignAndSend from 'hooks/useSignAndSend';
import { useAppSelector } from 'hooks/useRedux';

interface GameCreatorClaimFieldProps {
  contract_address: string;
}

export default function GameCreatorClaim() {
  const { api } = useAppSelector(state => state.substrate);

  const { account } = useAppSelector(state => state.injected.polkadot);

  const { isLoading, mutation } = useSignAndSend({
    key: ['123'],
    address: account?.address as string,
  });

  const { isOpen, onClose, onToggle } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GameCreatorClaimFieldProps>();

  return (
    <>
      <Button
        variant="unstyled"
        display="flex"
        px={6}
        bg="primary.a.500"
        color="white"
        borderRadius="lg"
        onClick={onToggle}
        rightIcon={<LineAddIcon />}
      >
        Claim Contract
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <ModalOverlay />

        <ModalContent
          as="form"
          onSubmit={handleSubmit(data => {
            if (api) {
              mutation(api.tx.gameCreator.claimContract(data.contract_address));
            }
          })}
        >
          <ModalHeader color="primary.a.500" fontSize="xl" fontWeight="medium">
            Claim contract
          </ModalHeader>

          <ModalBody>
            <FormControl
              isRequired={true}
              isInvalid={!!errors.contract_address}
            >
              <FormLabel>Contract address</FormLabel>

              <NumberInput width="full" min={0}>
                <NumberInputField
                  {...NumberInputStyle}
                  {...register(`contract_address`, {
                    required: 'Please fill out this field.',
                    min: 0,
                  })}
                  required={false}
                  _focusVisible={{}}
                />
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter gap={4}>
            <Button type="submit" isLoading={isLoading}>
              Claim
            </Button>

            <Button onClick={onClose} isLoading={isLoading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
