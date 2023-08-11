import { Box, Center, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react';

import { Grid, Mousewheel } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import CollectionIcon from 'public/assets/line/collection-02.svg';

import { cloundinary_link } from 'axios/cloudinary_axios';
import { Link } from 'react-router-dom';
import useMetaCollection from 'hooks/useMetaCollection';
import RatioPicture from 'components/RatioPicture';
import TrendingCollectionLoading from './TrendingCollectionLoading';
import 'swiper/css';
import 'swiper/bundle';
import 'swiper/css/grid';
import useNFTsCollection, {
  NFTsCollectionProps,
} from 'hooks/useNFTsCollection';

export default function TrendingCollection() {
  const { NFTsCollection, isLoading } = useNFTsCollection<
    NFTsCollectionProps['entries']
  >({
    key: 'trendingCollection',
    filter: 'entries',
  });

  const { MetaCollection } = useMetaCollection({
    key: 'trendingCollection',
    filter: 'entries',
  });

  return (
    <Stack spacing={6} mt={12}>
      <Flex gap={3} alignItems="center">
        <Icon
          as={CollectionIcon}
          width={6}
          height={6}
          sx={{
            path: { stroke: 'url(#CollectionLinear06)' },
          }}
        />

        <Text color="shader.a.900" fontWeight="semibold" fontSize="xl">
          Trending Collections
        </Text>
      </Flex>

      <Box>
        {isLoading && <TrendingCollectionLoading />}

        {NFTsCollection?.length ? (
          <Swiper
            spaceBetween={20}
            loop={true}
            grid={{ rows: 3, fill: 'row' }}
            modules={[Mousewheel, Grid]}
            mousewheel={{ forceToAxis: true }}
            breakpoints={{
              0: { slidesPerView: 1, grid: { rows: 2 } },
              480: { slidesPerView: 2, grid: { rows: 2 } },
              768: { slidesPerView: 3 },
              1280: { slidesPerView: 3.1 },
            }}
          >
            {NFTsCollection.map(({ collection_id }) => {
              const currentMetaCollection = MetaCollection?.find(
                meta => meta?.collection_id === collection_id
              );

              return (
                <SwiperSlide key={collection_id}>
                  <HStack
                    spacing={4}
                    as={Link}
                    to={`/collection/${collection_id}`}
                    flexWrap={{
                      base: 'wrap',
                      xl: 'unset',
                    }}
                  >
                    <RatioPicture
                      alt={collection_id}
                      src={
                        currentMetaCollection?.image
                          ? cloundinary_link(currentMetaCollection.image)
                          : null
                      }
                      sx={{
                        width: { base: 'full', xl: 14 },
                        height: { base: 'full', xl: 14 },
                      }}
                    />

                    <Box width={{ base: 'full', xl: 'auto' }}>
                      <Text
                        fontSize="lg"
                        fontWeight="medium"
                        color="shader.a.900"
                      >
                        {currentMetaCollection?.title || '-'} ID&nbsp;
                        {collection_id}
                      </Text>

                      <Center
                        gap={3}
                        justifyContent="space-between"
                        fontSize="sm"
                        color="shader.a.600"
                      >
                        <Flex flexDirection="column">
                          <Text>Floor Price:&nbsp;</Text>
                          <Text color="shader.a.900" fontWeight="medium">
                            0.00 GAFI
                          </Text>
                        </Flex>

                        <Flex flexDirection="column">
                          <Text>Vol:&nbsp;</Text>
                          <Text color="shader.a.900" fontWeight="medium">
                            0.00 GAFI
                          </Text>
                        </Flex>
                      </Center>
                    </Box>
                  </HStack>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <Center>Empty</Center>
        )}
      </Box>
    </Stack>
  );
}
