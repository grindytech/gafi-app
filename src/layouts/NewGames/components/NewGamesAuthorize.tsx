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
import React from 'react';

import NewGamesProfile from './NewGamesProfile';

import { FieldValues, UseFormGetValues } from 'react-hook-form';
import GafiAmount from 'components/GafiAmount';
import { useSubstrateState } from 'contexts/substrateContext';

import useTxCallBack from 'hooks/useTxCallBack';

interface NewGamesFieldProps {
  admin: {
    address: string;
    name: string;
  };
  game_id: string;
}

interface NewGamesAuthorizeProps {
  onClose: () => void;
  getValues: UseFormGetValues<FieldValues>;
  refetch: () => void;
}

export default function NewGamesAuthorize({
  onClose,
  getValues,
  refetch,
}: NewGamesAuthorizeProps) {
  const { api } = useSubstrateState();
  const { game_id, admin } = getValues() as NewGamesFieldProps;

  const { isLoading, mutation } = useTxCallBack({
    address: admin.address,
    key: ['createGame', game_id],
    submit: api?.tx.game.createGame(admin.address),
    onSuccess() {
      refetch();
      onClose();
    },
  });

  return (
    <Modal isOpen={true} onClose={onClose} size="xl">
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
              Authorize transaction
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
                <Td>Game ID</Td>
                <Td>{game_id}</Td>
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
            isLoading={isLoading}
            _hover={{}}
            margin="unset"
            onClick={() => mutation.mutate()}
          >
            Sign & Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
