import { UseFormGetValues } from 'react-hook-form';
import { AddPriceItemFieldProps } from './index';
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
import NewGamesProfile from 'layouts/Web3/NewGames/components/NewGamesProfile';
import useSignAndSend from 'hooks/useSignAndSend';
import { useAppSelector } from 'hooks/useRedux';

interface AddPriceItemModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<AddPriceItemFieldProps>;
}

export default function AddPriceItemModal({
  getValues,
  onClose,
}: AddPriceItemModalProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { collection_id, role, item_id, price, supply } = getValues();

  const { isLoading, mutation } = useSignAndSend({
    address: role.address,
    key: ['set_price', String(collection_id)],
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
              Set Price
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

              <Tr>
                <Td>Price</Td>
                <Td>{price}</Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter px={0} pb={0}>
          <Button
            variant="primary"
            isLoading={isLoading}
            _hover={{}}
            margin="unset"
            onClick={() => {
              if (api) {
                mutation(
                  api.tx.game.setPrice(
                    {
                      collection: collection_id,
                      item: item_id,
                      amount: supply,
                    },
                    price,
                    null,
                    null
                  )
                );
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
