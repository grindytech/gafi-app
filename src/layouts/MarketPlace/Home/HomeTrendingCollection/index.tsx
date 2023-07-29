import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';

import { Grid, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import CollectionIcon from 'public/assets/line/collection-02.svg';
import ArrowIcon from 'public/assets/line/chevron-02.svg';

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import React from 'react';

import { cloundinary_link } from 'axios/cloudinary_axios';
import { Link } from 'react-router-dom';
import useMetaCollection from 'hooks/useMetaCollection';

export default function HomeTrendingCollection() {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { data } = useQuery({
    queryKey: ['trendingCollection', account?.address],
    queryFn: async () => {
      if (api) {
        const service = await api.query.nfts.collection.entries();

        return service.map(
          ([
            {
              args: [collection_id],
            },
          ]) => ({
            collection_id: collection_id.toNumber(),
          })
        );
      }
    },
    enabled: !!(api && api.query.nfts.collection),
  });

  const { metaCollection } = useMetaCollection({
    group: data?.map(item => ({
      collection_id: item.collection_id,
    })),
  });

  return (
    <Box color="shader.a.900">
      <Center justifyContent="space-between">
        <Flex gap={3} alignItems="center">
          <Icon
            as={CollectionIcon}
            h={6}
            w={6}
            sx={{
              path: {
                stroke: 'url(#CollectionLinear06)',
              },
            }}
          />
          <Heading variant="sub02">Trending Collections</Heading>
        </Flex>

        <Link to="/marketplace/explorer/collections">
          <Button
            variant="more"
            fontSize="sm"
            rightIcon={
              <Icon
                as={ArrowIcon}
                transform="rotate(180deg)"
                color="primary.a.500"
                height="1.25rem"
                width="1.25rem"
              />
            }
          >
            more
          </Button>
        </Link>
      </Center>

      <Box mt={6}>
        <Swiper
          modules={[Mousewheel, Grid]}
          spaceBetween={32}
          slidesPerView={4}
          grid={{
            rows: 3,
            fill: 'row',
          }}
          mousewheel={{
            forceToAxis: true,
          }}
        >
          {data && data.length ? (
            React.Children.toArray(
              data.map(({ collection_id }, index) => (
                <SwiperSlide>
                  <HStack
                    as={Link}
                    to={`/marketplace/collection/${collection_id}`}
                    position="relative"
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    <Text
                      position="absolute"
                      left={0}
                      textAlign="left"
                      fontWeight="medium"
                    >
                      {collection_id}
                    </Text>

                    <Center
                      ml={8}
                      bg="shader.a.300"
                      position="relative"
                      overflow="hidden"
                      width={14}
                      height={14}
                      borderRadius="xl"
                      sx={{
                        img: {
                          position: 'absolute',
                          inset: 0,
                          width: 'full',
                          height: 'full',
                        },
                      }}
                    >
                      {metaCollection?.[index]?.image ? (
                        <Image
                          objectFit="cover"
                          alt="image is outdated"
                          src={`${cloundinary_link}/${metaCollection[index]?.image}`}
                        />
                      ) : (
                        <Image padding={2} src="/assets/fill/item.png" />
                      )}
                    </Center>

                    <Text
                      color="shader.a.900"
                      fontSize="lg"
                      fontWeight="medium"
                    >
                      {metaCollection?.[index]?.title || '-'}
                    </Text>
                  </HStack>
                </SwiperSlide>
              ))
            )
          ) : (
            <Center>Empty</Center>
          )}
        </Swiper>
      </Box>
    </Box>
  );
}
