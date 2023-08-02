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
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import useItemBalanceOf from 'hooks/useItemBalanceOf';
import { useAppSelector } from 'hooks/useRedux';
import React from 'react';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { shorten } from 'utils/utils';

export default function NFTDetailOwner() {
  const { nft_id, collection_id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { account } = useAppSelector(state => state.injected.polkadot);

  const { getItemBalanceOf } = useItemBalanceOf({
    key: `${nft_id}/${collection_id}`,
    group: [
      {
        collection_id: Number(collection_id),
        nft_id: Number(nft_id),
        owner: String(account?.address),
      },
    ],
  });

  return (
    <>
      {!!getItemBalanceOf?.length && (
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
              &nbsp;{getItemBalanceOf.length}
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
                    getItemBalanceOf.map(meta => (
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
                              address={String(meta?.owner)}
                              sx={{ width: '2rem', height: '2rem' }}
                            />
                          </Box>

                          <Box>
                            <Text lineHeight={1}>-</Text>
                            <Text as="span">
                              {shorten(String(meta?.owner), 6)}
                            </Text>
                          </Box>
                        </HStack>

                        <Text>{meta?.amount} items</Text>
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
