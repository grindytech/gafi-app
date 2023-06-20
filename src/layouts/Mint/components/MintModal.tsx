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
} from '@chakra-ui/react';
import GafiAmount from 'components/GafiAmount';
import NewGamesProfile from 'layouts/NewGames/components/NewGamesProfile';
import React from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

import { useSubstrateState } from 'contexts/substrateContext';

import useTxCallBack from 'hooks/useTxCallBack';

export interface MintFieldSubmitProps {
  admin: {
    address: string;
    name: string;
  };

  amount: string;
  pool_id: string;
}

interface MintModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

export default function MintModal({ getValues, onClose }: MintModalProps) {
  const { amount, pool_id, admin } = getValues() as MintFieldSubmitProps;

  const { api } = useSubstrateState();

  const { isLoading, mutation } = useTxCallBack({
    address: admin.address,
    key: ['Minging', pool_id],
    submit: api?.tx.game.mint(pool_id, admin.address, amount),
    onSuccess() {
      onClose();
    },
  });

  return (
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

          <NewGamesProfile account={admin.name} hash={admin.address} />
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
                <Td>Amount ID</Td>
                <Td>{amount}</Td>
              </Tr>

              <Tr>
                <Td>Fee</Td>
                <Td>
                  <GafiAmount amount="50,689" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="createGameSubmit"
            margin="unset"
            _hover={{}}
            isLoading={isLoading}
            onClick={() => mutation.mutateAsync()}
          >
            Sign & Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
