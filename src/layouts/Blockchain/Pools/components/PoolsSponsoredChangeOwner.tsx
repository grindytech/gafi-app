import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { convertHex } from 'utils/utils';

import Swap02Icon from 'public/assets/line/swap-02.svg';
import CloseIcon from 'public/assets/line/close.svg';
import { useForm } from 'react-hook-form';

interface PoolsSponsoredChangeOwnerProps {
  onClose: () => void;
  owner: string;
}

export default function PoolsSponsoredChangeOwner({
  onClose,
  owner,
}: PoolsSponsoredChangeOwnerProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ owner_address: string }>();

  return (
    <>
      <Modal
        isCentered
        isOpen={true}
        onClose={() => {
          onClose();
          reset();
        }}
      >
        <ModalOverlay
          backdropFilter="blur(0.46875rem)"
          bg={convertHex('#000000', 0.45)}
        />

        <ModalContent
          as="form"
          onSubmit={handleSubmit(data => {
            console.log(owner);
            console.log(data);

            // api?.tx.gameCreator.changeOwnership(owner, data.owner_address);
          })}
        >
          <ModalHeader>
            <Center gap={2}>
              <Box
                display="flex"
                borderRadius="2xl"
                bg="primary.a.100"
                color="primary.a.500"
                padding={1.5}
              >
                <Icon as={Swap02Icon} width={4} height={4} />
              </Box>

              <Text flex={1} color="shader.a.900" fontWeight="semibold">
                Change owner
              </Text>

              <Button
                as={ModalCloseButton}
                variant="unstyled"
                minWidth="auto"
                width={6}
                height={6}
                position="unset"
                iconSpacing={0}
                rightIcon={<CloseIcon />}
              />
            </Center>
          </ModalHeader>

          <ModalBody>
            <FormControl isRequired={true} isInvalid={!!errors.owner_address}>
              <FormLabel>Owner address</FormLabel>

              <Input
                placeholder="Ex: 0x6D89..."
                required={false}
                color="shader.a.500"
                fontSize="sm"
                fontWeight="normal"
                borderRadius="lg"
                borderColor="shader.a.300"
                _focusVisible={{}}
                {...register('owner_address', {
                  required: 'Please fill out this field.',
                  minLength: 1,
                })}
              />
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
              Change
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
