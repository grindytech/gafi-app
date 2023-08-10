import React from 'react';

import {
  Box,
  Center,
  HStack,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import ChakraBox from 'components/ChakraBox';

import { useAppSelector } from 'hooks/useRedux';
import { useParams } from 'react-router-dom';
import { shorten } from 'utils/utils';
import { cloundinary_link } from 'axios/cloudinary_axios';
import CollectionDetailNFT from './CollectionDetailNFT';
import useMetaCollection from 'hooks/useMetaCollection';

import useGetCollection, { nftsCollectionProps } from 'hooks/useGetCollection';
import RatioPicture from 'components/RatioPicture';

export default function CollectionDetail() {
  const { collection_id } = useParams();

  const { account } = useAppSelector(state => state.injected.polkadot);

  const { metaCollection } = useMetaCollection({
    key: String(collection_id),
    group: [
      {
        collection_id: Number(collection_id),
      },
    ],
  });

  const getCollection = useGetCollection<nftsCollectionProps>({
    key: String(account?.address),
    group: [Number(collection_id)],
    filter: 'only',
  });

  const { isOpen, onToggle } = useDisclosure();
  const [line, setLine] = React.useState(0);

  if (getCollection.isError) {
    return <Center>not found</Center>;
  }

  return (
    <>
      {getCollection.data ? (
        <Box
          borderRadius="xl"
          boxShadow="0px 0.1875rem 0.875rem 0px rgba(0, 0, 0, 0.05)"
          bg="white"
        >
          <Center height={80} bg="shader.a.300" position="relative">
            {metaCollection?.[0]?.image ? (
              <Image
                position="absolute"
                width="full"
                height="full"
                objectFit="cover"
                src={cloundinary_link(metaCollection?.[0].image)}
              />
            ) : null}

            <Box
              bg="linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)"
              position="absolute"
              height={24}
              inset="auto 0 0 0"
            />

            <RatioPicture
              src={
                metaCollection?.[0]
                  ? cloundinary_link(metaCollection?.[0].image)
                  : null
              }
              sx={{
                height: 32,
                width: 32,
                border: '0.625rem solid white',
                position: 'absolute',
                inset: 'auto auto 0 50%',
                transform: 'translate(-50%, 50%)',
              }}
            />
          </Center>

          <Center
            pt={20}
            pb={6}
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
            <HStack spacing={1}>
              <Text fontSize="2xl" lineHeight="initial" fontWeight="bold">
                {metaCollection?.[0]?.title || '-'}
              </Text>
            </HStack>

            <HStack>
              <Text color="shader.a.500">
                Owner by&nbsp;
                <Text as="span" color="primary.a.500" fontWeight="medium">
                  {getCollection.data.owner === account?.address
                    ? 'you'
                    : shorten(getCollection.data.owner, 6)}
                </Text>
              </Text>
            </HStack>

            {metaCollection?.[0]?.description ? (
              <>
                <ChakraBox
                  width="2xl"
                  color="shader.a.700"
                  overflow="hidden"
                  animate={{
                    height: line > 2 && !isOpen ? '3rem' : undefined,
                  }}
                >
                  {metaCollection?.[0].description}
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
              mt={5}
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

                <Text as="span">{getCollection.data.items}</Text>
              </ListItem>
            </List>
          </Center>

          <CollectionDetailNFT />
        </Box>
      ) : null}
    </>
  );
}
