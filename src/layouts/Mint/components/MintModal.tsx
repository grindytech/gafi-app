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

interface MintFieldSubmitProps {
  owner: {
    account: string;
    hash: string;
  };

  mint: {
    account: string;
    hash: string;
  };

  amount: string;
  collection_id: string;
}

interface MintModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<FieldValues>;
}

export default function MintModal({ getValues, onClose }: MintModalProps) {
  const { amount, collection_id, mint, owner } =
    getValues() as MintFieldSubmitProps;

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
              Mining
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
                <Td>Amount ID</Td>
                <Td>{amount}</Td>
              </Tr>

              <Tr>
                <Td>Fee</Td>
                <Td>
                  <GafiAmount amount="50,689" />
                </Td>
              </Tr>

              <Tr>
                <Td>Mint to</Td>
                <Td>
                  <NewGamesProfile
                    hash={mint.hash}
                    account={mint.account}
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
            onClick={() => {
              console.log(getValues());
            }}
          >
            Sign & Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
