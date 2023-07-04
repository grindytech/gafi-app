import {
  Button,
  FormControl,
  FormLabel,
  Icon,
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

import useSignAndSend from 'hooks/useSignAndSend';
import { useAppSelector } from 'hooks/useRedux';

interface GameCreatorClaimFieldProps {
  contract_address: string;
}

export default function GameCreatorClaim() {
  const { api } = useAppSelector(state => state.substrate);

  const { account } = useAppSelector(state => state.injected.polkadot);

  const { mutation } = useSignAndSend({
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
        px={4}
        fontSize="sm"
        fontWeight="medium"
        bg="primary.a.500"
        color="white"
        borderRadius="lg"
        onClick={onToggle}
        iconSpacing={2}
        leftIcon={<Icon as={LineAddIcon} width={5} height={5} />}
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

          <ModalFooter
            gap={2}
            sx={{
              button: {
                height: 'auto',
                px: 4,
                py: 2,
                borderRadius: 'lg',
                fontSize: 'sm',
                fontWeight: 'medium',
              },
            }}
          >
            <Button
              variant="unstyled"
              color="shader.a.900"
              border="0.0625rem solid"
              borderColor="shader.a.400"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              variant="unstyled"
              color="white"
              bg="primary.a.500"
              type="submit"
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
