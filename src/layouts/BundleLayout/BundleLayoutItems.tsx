import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { GafiSupportGameTypesPackage } from '@polkadot/types/lookup';
import { cloundinary_link } from 'axios/cloudinary_axios';
import RatioPicture from 'components/RatioPicture';
import useMetaCollection from 'hooks/useMetaCollection';
import useMetaNFT from 'hooks/useMetaNFT';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { Thumbs } from 'swiper';
import CardBox from 'components/CardBox';

interface BundleLayoutItemsProps {
  queryKey: string;
  data: GafiSupportGameTypesPackage[];
  setThumbsSwiper: React.Dispatch<SwiperType>;
  heading: string;
}

export default function BundleLayoutItems({
  queryKey,
  data,
  setThumbsSwiper,
  heading,
}: BundleLayoutItemsProps) {
  const { metaCollection } = useMetaCollection({
    key: queryKey,
    group: data.map(meta => ({
      collection_id: meta.collection.toNumber(),
    })),
  });

  const { metaNFT } = useMetaNFT({
    key: queryKey,
    group: data.map(meta => ({
      nft_id: meta.item.toNumber(),
      collection_id: meta.collection.toNumber(),
    })),
  });

  return (
    <CardBox variant="baseStyle" padding={0} color="shader.a.900">
      <Text
        py={5}
        px={6}
        fontWeight="medium"
        borderBottom="0.0625rem solid"
        borderColor="shader.a.200"
      >
        {heading}&nbsp;
        <Text as="span" color="shader.a.500" fontSize="sm">
          {data.length} Items
        </Text>
      </Text>

      <Box
        padding={6}
        pt={4}
        sx={{
          '.swiper-slide-thumb-active': {
            '> div': { borderColor: 'primary.a.500' },
          },
        }}
      >
        <Swiper
          modules={[Thumbs]}
          slidesPerView={data.length}
          mousewheel={{ forceToAxis: true }}
          onSwiper={setThumbsSwiper}
          direction="vertical"
        >
          {React.Children.toArray(
            data.map(meta => {
              const currentMetaCollection = metaCollection?.find(
                data => data?.collection_id === meta.collection.toNumber()
              );

              const currentMetaNFT = metaNFT?.find(
                data =>
                  data?.collection_id === meta.collection.toNumber() &&
                  data?.nft_id === meta.item.toNumber()
              );

              return (
                <SwiperSlide>
                  <Center
                    mt={2}
                    justifyContent="space-between"
                    wordBreak="break-word"
                    borderRadius="xl"
                    gap={4}
                    padding={4}
                    border="0.0625rem solid"
                    borderColor="shader.a.300"
                  >
                    <Flex gap={4}>
                      <RatioPicture
                        src={
                          currentMetaNFT?.image
                            ? cloundinary_link(currentMetaNFT.image)
                            : null
                        }
                        sx={{ width: 12 }}
                      />

                      <Box>
                        <Text
                          as="strong"
                          fontWeight="medium"
                          color="shader.a.500"
                          fontSize="sm"
                        >
                          {currentMetaCollection?.title || '-'}
                        </Text>

                        <Text fontWeight="medium">
                          {currentMetaNFT?.title || '-'}&nbsp;
                          <Text
                            as="span"
                            fontSize="sm"
                            color="shader.a.700"
                            fontWeight="normal"
                          >
                            ID: {meta.item.toNumber()}
                          </Text>
                        </Text>
                      </Box>
                    </Flex>

                    <Text as="span" fontWeight="medium">
                      x{meta.amount.toNumber()}
                    </Text>
                  </Center>
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </Box>
    </CardBox>
  );
}
