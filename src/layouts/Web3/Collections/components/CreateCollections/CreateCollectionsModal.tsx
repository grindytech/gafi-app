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
  useToast,
} from '@chakra-ui/react';
import NewGamesProfile from 'layouts/Web3/NewGames/components/NewGamesProfile';

import { UseFormGetValues } from 'react-hook-form';

import useSignAndSend from 'hooks/useSignAndSend';
import { CreateCollectionFieldProps } from './index';
import { useAppSelector } from 'hooks/useRedux';

interface CreateCollectionsModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<CreateCollectionFieldProps>;
}

export default function CreateCollectionsModal({
  onClose,
  getValues,
}: CreateCollectionsModalProps) {
  const { api } = useAppSelector(state => state.substrate);

  const toast = useToast();
  const { collection_id, role, owner } = getValues();

  const { isLoading, mutation } = useSignAndSend({
    address: owner.address,
    key: ['createCollection', collection_id],
    onSuccess() {
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
              Create collection
            </Heading>

            <ModalCloseButton
              _hover={{}}
              _active={{}}
              position="unset"
              size="sm"
            />
          </Center>

          <NewGamesProfile account={role.name} hash={role.address} />
        </ModalHeader>

        <ModalBody
          padding={0}
          borderWidth="0.0625rem 0 0.0625rem 0"
          borderColor="shader.a.300"
        >
          {/* using notification 'bell' instead for show collection id */}
          {/* <Table variant="createGameSubmit">
            <Tbody>
              <Tr>
                <Td>Collection ID</Td>
                <Td>{collection_id}</Td>
              </Tr>
            </Tbody>
          </Table> */}
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="primary"
            isLoading={isLoading}
            _hover={{}}
            margin="unset"
            onClick={async () => {
              if (api) {
                try {
                  mutation(api.tx.game.createCollection(role.address));
                } catch (error: any) {
                  toast({
                    position: 'top-right',
                    status: 'error',
                    description: error.toString(),
                    isClosable: true,
                  });
                }
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
