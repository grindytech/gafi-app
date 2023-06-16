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
import GafiAmount from 'components/GafiAmount';
import NewGamesProfile from 'layouts/NewGames/components/NewGamesProfile';
import React from 'react';
import { FieldValues, UseFormGetValues } from 'react-hook-form';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { getFromAcct } from 'utils/gafiApp.utils';
import { useSubstrateState } from 'contexts/substrateContext';
import useTxCallback from 'hooks/useTxCallback';

interface CollectionsFieldSubmitProps {
  owner: {
    account: string;
    hash: string;
  };

  collection_id: number;
  mining_fee: number;
  admin: {
    account: string;
    hash: string;
  };
}

interface CollectionsModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

export default function CollectionsModal({
  onClose,
  getValues,
}: CollectionsModalProps) {
  const { owner, admin, collection_id, mining_fee } =
    getValues() as CollectionsFieldSubmitProps;

  const { api, currentAccount } = useSubstrateState();

  const toast = useToast({
    position: 'top-right',
    isClosable: true,
    status: 'error',
  });

  const refetch = () => {
    // do something
  };

  const onFinalize = () => {
    // do something
  };

  const txCallback = useTxCallback(refetch, onFinalize);

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
              Create collection
            </Heading>

            <ModalCloseButton
              _hover={{}}
              _active={{}}
              position="unset"
              size="sm"
            />
          </Center>

          <NewGamesProfile account={owner.account} hash={owner.hash} />
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
                <Td>Mining fee</Td>
                <Td>
                  <GafiAmount amount={mining_fee} />
                </Td>
              </Tr>

              <Tr>
                <Td>Fee</Td>
                <Td>
                  <GafiAmount amount="50,6895" />
                </Td>
              </Tr>

              <Tr>
                <Td>Admin</Td>
                <Td>
                  <NewGamesProfile
                    hash={admin.hash}
                    account={admin.account}
                    sx={{
                      textAlign: 'left',
                      mt: {
                        base: 2,
                        md: 0,
                      },
                      justifyContent: {
                        md: 'flex-end',
                      },
                    }}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="createGameSubmit"
            margin="unset"
            onClick={async () => {
              console.log(getValues());
              console.log(currentAccount);

              const txHash = await api?.tx.game
                .createCollection(admin.hash).signAndSend(owner.account);

              console.log(`Submitted with hash ${txHash}`);
            }}
          >
            Sign & Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
