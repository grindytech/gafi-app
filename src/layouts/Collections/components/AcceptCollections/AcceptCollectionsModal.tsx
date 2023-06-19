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
  useToast,
} from '@chakra-ui/react';
import NewGamesProfile from 'layouts/NewGames/components/NewGamesProfile';
import React from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';

import { getInjectedWeb3 } from 'utils/utils';
import { useSubstrateState } from 'contexts/substrateContext';

interface CreateCollectionFieldProps {
  admin: {
    address: string;
    name: string;
  };
  collection_id: string;
  game_id: string;
}

interface AcceptCollectionsModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

export default function AcceptCollectionsModal({
  onClose,
  getValues,
}: AcceptCollectionsModalProps) {
  const toast = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const { api } = useSubstrateState();
  const { collection_id, game_id, admin } =
    getValues() as CreateCollectionFieldProps;

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
              Add Accept Adding
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
                <Td>Collection ID</Td>
                <Td>{collection_id}</Td>
              </Tr>

              <Tr>
                <Td>Game ID</Td>
                <Td>{game_id}</Td>
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
            onClick={async () => {
              const injected = await getInjectedWeb3();

              if (api && injected) {
                const submit = api.tx.game.setAcceptAdding(
                  game_id,
                  collection_id
                );

                setIsLoading(true);

                await submit
                  .signAndSend(
                    admin.address,
                    {
                      signer: injected.signer,
                    },
                    e => {
                      setIsLoading(true);

                      if (e.isFinalized) {
                        toast({
                          position: 'top-right',
                          description: e.status.type,
                          status: 'info',
                        });
                        onClose();
                      }
                    }
                  )
                  .catch(error => {
                    setIsLoading(false);

                    toast({
                      position: 'top-right',
                      description: error.toString(),
                      status: 'info',
                    });
                  });
              }
            }}
          >
            Sign & Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
