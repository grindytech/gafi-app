import {
  Button,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import GafiAmount from 'components/GafiAmount';

import { UseFormGetValues, UseFormReset } from 'react-hook-form';

import { formatGAFI } from 'utils/utils';
import useSignAndSend from 'hooks/useSignAndSend';
import { useAppSelector } from 'hooks/useRedux';

import usePoolOf from 'hooks/usePoolOf';
import MintSuccessfuly from './MintSuccessfuly';
import AuthorizeProfile from 'layouts/AuthorizeProfile';
import { MintFieldProps } from '.';

interface MintModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<MintFieldProps>;
  reset: UseFormReset<MintFieldProps>;
}

export default function MintModal({
  getValues,
  onClose,
  reset,
}: MintModalProps) {
  const { amount, pool_id, role } = getValues();
  const {
    isOpen: isSuccess,
    onClose: closeSuccess,
    onOpen: openSuccess,
  } = useDisclosure();

  const { api } = useAppSelector(state => state.substrate);

  const { getPoolOf } = usePoolOf({
    key: pool_id,
    group: [{ pool_id: Number(pool_id) }],
  });

  const { isLoading, mutation } = useSignAndSend({
    address: role.address,
    key: ['Mining', pool_id],
    onSuccess() {
      openSuccess();
    },
    onError() {
      onClose();
    },
  });

  return (
    <>
      {isSuccess ? (
        <MintSuccessfuly
          reset={reset}
          onClose={onClose}
          onCloseSuccess={closeSuccess}
          getValues={getValues}
        />
      ) : (
        <Modal isOpen={true} onClose={onClose} size="2xl">
          <ModalOverlay />

          <ModalContent
            padding={{
              base: 4,
              md: 6,
            }}
            mx={3}
          >
            <ModalHeader px={0} pt={0} pb={6}>
              <Center justifyContent="space-between" pb={8}>
                <Heading fontWeight="bold" fontSize="xl" color="shader.a.900">
                  Mining
                </Heading>

                <ModalCloseButton
                  _hover={{}}
                  _active={{}}
                  position="unset"
                  size="sm"
                />
              </Center>

              <AuthorizeProfile account={role.name} hash={role.address} />
            </ModalHeader>

            <ModalBody
              padding={0}
              borderWidth="0.0625rem 0 0.0625rem 0"
              borderColor="shader.a.300"
            >
              <Table variant="createGameSubmit">
                <Tbody>
                  <Tr>
                    <Td>Pool ID</Td>

                    <Td>{pool_id}</Td>
                  </Tr>

                  <Tr>
                    <Td>Amount</Td>
                    <Td>{amount}</Td>
                  </Tr>

                  {getPoolOf ? (
                    <Tr>
                      <Td>Fee</Td>
                      <Td>
                        <GafiAmount
                          amount={
                            Number(formatGAFI(getPoolOf.price)) * Number(amount)
                          }
                        />
                      </Td>
                    </Tr>
                  ) : null}
                </Tbody>
              </Table>
            </ModalBody>

            <ModalFooter px={0} pb={0}>
              <Button
                variant="primary"
                margin="unset"
                _hover={{}}
                isLoading={isLoading}
                onClick={() => {
                  if (api) {
                    mutation(api.tx.game.mint(pool_id, role.address, amount));
                  }
                }}
              >
                Sign & Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
