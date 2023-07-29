import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Codec } from '@polkadot/types/types';
import { useQuery } from '@tanstack/react-query';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import { useAppSelector } from 'hooks/useRedux';
import React from 'react';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { shorten } from 'utils/utils';

interface itemBalanceOfProps {
  owner: string;
  amount: Codec;
}

export default function NFTDetailOwner() {
  const { nft_id, collection_id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { data } = useQuery({
    queryKey: [`itemBalanceOf/${nft_id}/${collection_id}`],
    queryFn: async () => {
      if (api && account?.address) {
        const service = await api.query.game.itemBalanceOf.entries(
          account.address,
          collection_id
        );

        return service
          .map(([meta, amount]) => {
            const [who, collection, item] = meta.args;

            if (
              Number(nft_id) === item.toNumber() &&
              Number(collection_id) === collection.toNumber()
            ) {
              return {
                owner: who.toString(),
                amount,
              };
            }
          })
          .filter((item): item is itemBalanceOfProps => !!item);
      }
    },
  });

  return (
    <>
      {!!data?.length && (
        <>
          <Button
            onClick={onOpen}
            variant="unstyled"
            height="auto"
            color="shader.a.500"
            fontWeight="medium"
          >
            Owners
            <Text as="span" color="primary.a.500" fontWeight="medium">
              &nbsp;{data.length}
            </Text>
          </Button>

          {isOpen && (
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
              <ModalOverlay />

              <ModalContent>
                <ModalHeader display="flex" justifyContent="space-between">
                  <Heading
                    fontSize="lg"
                    color="shader.a.900"
                    fontWeight="medium"
                  >
                    Owned by
                  </Heading>

                  <ModalCloseButton
                    position="unset"
                    width={6}
                    height={6}
                    _hover={{}}
                    _active={{}}
                  />
                </ModalHeader>

                <ModalBody>
                  {React.Children.toArray(
                    data.map(meta => (
                      <Center
                        as={Link}
                        to={`#`}
                        justifyContent="space-between"
                        padding={4}
                        transitionDuration="ultra-slow"
                        borderRadius="xl"
                        _hover={{
                          bg: 'shader.a.200',
                        }}
                      >
                        <HStack spacing={4}>
                          <Box>
                            <AccountJazzicon
                              address={meta.owner.toString()}
                              sx={{ width: '2rem', height: '2rem' }}
                            />
                          </Box>

                          <Box>
                            <Text lineHeight={1}>-</Text>
                            <Text as="span">
                              {shorten(meta.owner.toString(), 6)}
                            </Text>
                          </Box>
                        </HStack>

                        <Text>{meta.amount.toString()} items</Text>
                      </Center>
                    ))
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </>
  );
}
