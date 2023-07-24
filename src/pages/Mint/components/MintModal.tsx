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
import NewGamesProfile from 'layouts/Web3/NewGames/components/NewGamesProfile';
import { UseFormGetValues } from 'react-hook-form';

import { useQuery } from '@tanstack/react-query';
import { formatGAFI, unitGAFI } from 'utils/utils';
import useSignAndSend from 'hooks/useSignAndSend';
import { MintFieldProps } from '../index';
import { useAppSelector } from 'hooks/useRedux';

interface MintModalProps {
  onClose: () => void;
  getValues: UseFormGetValues<MintFieldProps>;
}

export default function MintModal({ getValues, onClose }: MintModalProps) {
  const { amount, pool_id, role } = getValues();

  const { api } = useAppSelector(state => state.substrate);

  const { data } = useQuery({
    queryKey: ['poolOf', pool_id],
    queryFn: async () => {
      if (api) {
        const res = await api.query.game.poolOf(pool_id);

        return res.toPrimitive() as {
          mintSettings: {
            price: string;
          };
        };
      }
    },
    enabled: !!(api && api.query.game),
  });

  const { isLoading, mutation } = useSignAndSend({
    address: role.address,
    key: ['Mining', pool_id],
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
                <Td>Pool ID</Td>

                <Td>{pool_id}</Td>
              </Tr>

              <Tr>
                <Td>Amount</Td>
                <Td>{amount}</Td>
              </Tr>

              {data
                ? (function () {
                    const price = Number(
                      formatGAFI(data.mintSettings.price).replaceAll(',', '')
                    );

                    const convertGAFI = unitGAFI(
                      String(Number(price) * Number(amount))
                    );

                    return (
                      <Tr>
                        <Td>Fee</Td>
                        <Td>
                          <GafiAmount amount={formatGAFI(convertGAFI)} />
                        </Td>
                      </Tr>
                    );
                  })()
                : null}
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
  );
}
