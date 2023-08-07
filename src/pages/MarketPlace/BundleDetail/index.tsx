import {
  Box,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import HeartIcon from 'public/assets/line/heart.svg';
import EyesIcon from 'public/assets/line/eye.svg';

import CardBox from 'components/CardBox';

import React, { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/useRedux';

import { Option, Vec } from '@polkadot/types';
import {
  GafiSupportGameTypesPackage,
  PalletGameTradeConfig,
} from '@polkadot/types/lookup';
import RatioPicture from 'components/RatioPicture';
import { formatCurrency, shorten } from 'utils/utils';

import DateBlock from 'components/DateBlock';
import GafiAmount from 'components/GafiAmount';

import useMetaNFT from 'hooks/useMetaNFT';
import { cloundinary_link } from 'axios/cloudinary_axios';
import BundleDetailBid from './BundleDetailBid';

import { SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import BundleDetailMenu from './BundleDetailMenu';
import SwiperThumbs from 'layouts/SwiperThumbs';
import SwiperThumbsButton from 'layouts/SwiperThumbs/SwiperThumbsButton';
import BundleDetailItems from './BundleDetailItems';

export default function BundleDetail() {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { id } = useParams();

  const { data, isError } = useQuery({
    queryKey: ['game_bundleOf', id],
    queryFn: async () => {
      if (api) {
        const service = (await api.query.game.bundleOf(
          id
        )) as Vec<GafiSupportGameTypesPackage>;

        const configOf = (await api.query.game.tradeConfigOf(
          id
        )) as Option<PalletGameTradeConfig>;

        return {
          owner: configOf.value.owner.toString(),
          maybePrice: configOf.value.maybePrice.toString(),
          endBlock: configOf.value.endBlock.value.toNumber(),
          meta: service.map(meta => meta),
        };
      }
    },
  });

  const { metaNFT } = useMetaNFT({
    key: `bundle/${id}`,
    group: data?.meta.map(meta => ({
      nft_id: meta.item.toNumber(),
      collection_id: meta.collection.toNumber(),
    })),
  });

  const swiperRef = useRef<SwiperType>();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (isError) return <>not found</>;

  return (
    <Box>
      {data ? (
        <>
          <Grid gridTemplateColumns={{ lg: 'repeat(2, 1fr)' }} gap={5}>
            <CardBox
              variant="baseStyle"
              padding={0}
              position={{ lg: 'sticky' }}
              top={24}
              overflow="hidden"
              height="fit-content"
              role="group"
            >
              <SwiperThumbs
                swiperRef={swiperRef}
                thumbs={thumbsSwiper as SwiperType}
              >
                <BundleDetailMenu swiperRef={swiperRef} data={data.meta} />

                <SwiperThumbsButton swiperRef={swiperRef} />

                {React.Children.toArray(
                  data.meta.map(meta => {
                    const currentMetaNFT = metaNFT?.find(
                      data =>
                        data?.collection_id === meta.collection.toNumber() &&
                        data?.nft_id === meta.item.toNumber()
                    );

                    return (
                      <SwiperSlide>
                        <RatioPicture
                          src={
                            currentMetaNFT?.image
                              ? cloundinary_link(currentMetaNFT.image)
                              : null
                          }
                          sx={{ height: '40rem' }}
                        />
                      </SwiperSlide>
                    );
                  })
                )}
              </SwiperThumbs>

              <HStack padding={6} justifyContent="space-between">
                <HStack gap={6}>
                  <Flex gap={2}>
                    <Icon as={HeartIcon} h={5} w={5} color="primary.a.500" />
                    <Text fontWeight="medium">12</Text>
                  </Flex>
                  <Flex gap={2}>
                    <Icon as={EyesIcon} h={5} w={5} />
                    <Text fontWeight="medium">144</Text>
                  </Flex>
                </HStack>
              </HStack>
            </CardBox>

            <VStack alignItems="flex-start" gap={4}>
              <CardBox variant="baseStyle">
                <Heading
                  fontSize="md"
                  fontWeight="normal"
                  color="shader.a.500"
                  mb={6}
                >
                  Owned by&nbsp;
                  <Text as="span" color="primary.a.500" fontWeight="medium">
                    {account?.address === data.owner
                      ? 'You'
                      : shorten(data.owner)}
                  </Text>
                </Heading>

                <CardBox variant="baseStyle" padding={0}>
                  <Text
                    color="shader.a.500"
                    fontSize="sm"
                    borderBottom="0.0625rem solid"
                    borderColor="shader.a.200"
                    px={6}
                    py={4}
                  >
                    Bundle end at&nbsp;
                    <DateBlock
                      endBlock={data.endBlock}
                      sx={{
                        as: 'span',
                        fontWeight: 'medium',
                        color: 'second.red',
                      }}
                    />
                  </Text>

                  <Stack spacing={6} padding={6}>
                    <Box
                      borderRadius="xl"
                      border="0.0625rem solid"
                      borderColor="shader.a.300"
                      bg="shader.a.200"
                      padding={4}
                    >
                      <GafiAmount
                        amount={data.maybePrice}
                        sx={{
                          sx: {
                            '&, span': {
                              fontSize: 'xl',
                              color: 'shader.a.900',
                              fontWeight: 'semibold',
                            },
                          },
                        }}
                      />

                      <Text
                        as="strong"
                        color="shader.a.500"
                        fontSize="sm"
                        fontWeight="normal"
                      >
                        {formatCurrency(Number(data.maybePrice), 'usd')}
                      </Text>
                    </Box>

                    <BundleDetailBid maybePrice={data.maybePrice} />
                  </Stack>
                </CardBox>
              </CardBox>

              <CardBox variant="baseStyle" padding={0}>
                <Text
                  py={5}
                  px={6}
                  color="shader.a.900"
                  fontWeight="medium"
                  borderBottom="0.0625rem solid"
                  borderColor="shader.a.200"
                >
                  Bundles detail&nbsp;
                  <Text as="span" color="shader.a.500" fontSize="sm">
                    {data.meta.length} Items
                  </Text>
                </Text>

                <BundleDetailItems
                  queryKey={`bundle/${id}`}
                  data={data.meta}
                  setThumbsSwiper={setThumbsSwiper}
                />
              </CardBox>
            </VStack>
          </Grid>
        </>
      ) : null}
    </Box>
  );
}
