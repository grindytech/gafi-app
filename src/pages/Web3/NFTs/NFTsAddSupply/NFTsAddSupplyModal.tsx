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

import useSignAndSend from 'hooks/useSignAndSend';

import { UseFormGetValues, UseFormReset } from 'react-hook-form';

import { useAppSelector } from 'hooks/useRedux';
import AuthorizeProfile from 'layouts/AuthorizeProfile';
import { NFTsAddSupplyFieldProps } from '.';

interface NFTsAddSupplyModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<NFTsAddSupplyFieldProps>;
  reset: UseFormReset<NFTsAddSupplyFieldProps>;
}

export default function NFTsAddSupplyModal({
  getValues,
  onClose,
  reset,
}: NFTsAddSupplyModalProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { collection_id, item_id, supply, role } = getValues();

  const { isLoading, mutation } = useSignAndSend({
    address: role.address,
    key: ['add_supply_nft', String(item_id)],
    onSuccess() {
      reset({
        role: { ...role },
        collection_id: undefined,
        item_id: undefined,
        supply: undefined,
      });
      onClose();
    },
    onError() {
      onClose();
    },
  });

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      size="xl"
      closeOnOverlayClick={!isLoading}
    >
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
              Add Supply
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
                <Td>Collection ID</Td>
                <Td>{collection_id}</Td>
              </Tr>

              <Tr>
                <Td>Item ID</Td>
                <Td>{item_id}</Td>
              </Tr>

              <Tr>
                <Td>Supply</Td>
                <Td>{supply}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="primary"
            margin="unset"
            isLoading={isLoading}
            _hover={{}}
            onClick={() => {
              if (api) {
                mutation(api.tx.game.addSupply(collection_id, item_id, supply));
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
