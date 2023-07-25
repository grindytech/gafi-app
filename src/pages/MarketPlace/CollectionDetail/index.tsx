import React from 'react';
import VerfyIcon from 'public/assets/fill/verified.svg';
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import ChakraBox from 'components/ChakraBox';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import { useParams } from 'react-router-dom';
import { shorten } from 'utils/utils';
import { TypeMetadataOfCollection } from 'types';
import { cloundinary_link } from 'axios/cloudinary_axios';
import CollectionDetailNFT from './CollectionDetailNFT';

export default function CollectionDetail() {
  const { id } = useParams();

  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { data, isError } = useQuery({
    queryKey: ['collection', id],
    queryFn: async () => {
      if (api) {
        const getCollection = (
          await api.query.nfts.collection(id)
        ).toHuman() as { items: number; owner: string };

        const metadata = (
          await api.query.nfts.collectionMetadataOf(id)
        ).toHuman() as { data: string };

        return {
          owner: getCollection.owner,
          items: getCollection.items,
          metadata: metadata
            ? (JSON.parse(metadata.data) as TypeMetadataOfCollection)
            : null,
        };
      }
    },
  });

  const { isOpen, onToggle } = useDisclosure();
  const [line, setLine] = React.useState(0);

  if (isError) {
    return <Center>not found</Center>;
  }

  return (
    <>
      {data ? (
        <Box
          borderRadius="xl"
          boxShadow="0px 0.1875rem 0.875rem 0px rgba(0, 0, 0, 0.05)"
          bg="white"
        >
          <Box position="relative" pb={6}>
            <Center
              height={64}
              bg="shader.a.300"
              overflow="hidden"
              position="relative"
            >
              {data.metadata?.image ? (
                <Image
                  src={`${cloundinary_link}/${data.metadata.image}`}
                  pointerEvents="none"
                  position="absolute"
                  inset="50% auto auto 50%"
                  transform="translate(-50%, -50%)"
                  width="full"
                />
              ) : null}

              <Box
                bg="linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)"
                position="absolute"
                height={24}
                inset="auto 0 0 0"
              />
            </Center>

            <Center
              flexDirection="column"
              position="relative"
              textAlign="center"
              onLoad={(event: any) => {
                // because dom content needs loaded
                const target =
                  event.target.offsetParent.parentElement.children[3];

                const getLine = Number(
                  String(Math.round(Number(target.offsetHeight / 2)))[0] // first digits
                );

                setLine(getLine);
              }}
            >
              <Center
                height={32}
                position="absolute"
                overflow="hidden"
                transform="translateY(-50%)"
                inset="0 0 auto 0"
              >
                <Image
                  borderRadius="xl"
                  bg="shader.a.300"
                  border="0.625rem solid white"
                  height="full"
                  objectFit={data.metadata?.image ? 'cover' : 'none'}
                  src={
                    data.metadata?.image
                      ? `${cloundinary_link}/${data.metadata.image}`
                      : '/assets/fill/item.png'
                  }
                />
              </Center>

              <HStack spacing={1} mt={24}>
                <Text fontSize="2xl" lineHeight="initial" fontWeight="bold">
                  {data.metadata?.title || '-'}
                </Text>

                {data.metadata?.title ? (
                  <Icon as={VerfyIcon} h={5} w={5} />
                ) : null}
              </HStack>

              <HStack>
                <Text color="shader.a.500">
                  Owner by&nbsp;
                  <Text as="span" color="primary.a.500" fontWeight="medium">
                    {data.owner === account?.address
                      ? 'you'
                      : shorten(data.owner, 6)}
                  </Text>
                </Text>
              </HStack>

              {data.metadata?.description ? (
                <>
                  <ChakraBox
                    width="2xl"
                    color="shader.a.700"
                    overflow="hidden"
                    animate={{
                      height: line > 2 && !isOpen ? '3rem' : undefined,
                    }}
                  >
                    {data.metadata.description}
                  </ChakraBox>

                  {line > 2 ? (
                    <Text
                      as="span"
                      color="primary.a.500"
                      fontWeight="medium"
                      onClick={onToggle}
                      cursor="pointer"
                    >
                      {isOpen ? 'Show less' : 'Show more'}
                    </Text>
                  ) : null}
                </>
              ) : null}

              <List
                display="flex"
                gap={16}
                px={6}
                py={4}
                borderRadius="xl"
                border="0.0625rem solid"
                borderColor="shader.a.300"
                sx={{
                  p: {
                    color: 'shader.a.500',
                    pb: 0.5,
                  },
                  span: {
                    color: 'shader.a.900',
                    fontWeight: 'medium',
                  },
                }}
              >
                <ListItem>
                  <Text>Items</Text>

                  <Text as="span">{data.items}</Text>
                </ListItem>
              </List>
            </Center>
          </Box>

          <CollectionDetailNFT />
        </Box>
      ) : null}
    </>
  );
}
