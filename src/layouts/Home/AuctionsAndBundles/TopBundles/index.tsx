import { Box, Center, Text } from '@chakra-ui/react';

import { Grid, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import React, { useRef } from 'react';

import { cloundinary_link } from 'axios/cloudinary_axios';
import { Link } from 'react-router-dom';

import RatioPicture from 'components/RatioPicture';
import { Option, StorageKey, Vec, u128, u32 } from '@polkadot/types';
import {
  GafiSupportGameTypesPackage,
  PalletGameTradeConfig,
} from '@polkadot/types/lookup';
import useMetaNFT from 'hooks/useMetaNFT';
import CardBox from 'components/CardBox';
import DateBlock from 'components/DateBlock';
import GafiAmount from 'components/GafiAmount';
import SwiperThumbsButton from 'layouts/SwiperThumbs/SwiperThumbsButton';
import { Swiper as SwiperType } from 'swiper/types';
import TopBundlesSkeleton from './TopBundlesSkeleton';
import useBundleOf from 'hooks/useBundleOf';

interface tradeConfigOfProps {
  endBlock: Option<u32>;
  maybePrice: Option<u128>;
  trade_id: number;
  collection_id: number;
  nft_id: number;
}

export default function TopBundles() {
  // const { data, isLoading } = useQuery({
  //   queryKey: ['bundleOf', account?.address],
  //   queryFn: async () => {
  //     if (api) {
  //       const service = await api.query.game.bundleOf.entries();

  //       return Promise.all(
  //         service.map(
  //           async ([trade_id, meta]: [
  //             StorageKey<[u32]>,
  //             Vec<GafiSupportGameTypesPackage>
  //           ]) => {
  //             const tradeConfigOf = (await api.query.game.tradeConfigOf(
  //               trade_id.args[0].toNumber()
  //             )) as Option<PalletGameTradeConfig>;

  //             if (tradeConfigOf.value.trade?.isBundle) {
  //               return {
  //                 endBlock: tradeConfigOf.value.endBlock,
  //                 maybePrice: tradeConfigOf.value.maybePrice,
  //                 trade_id: trade_id.args[0].toNumber(),
  //                 collection_id: meta[0].collection.toNumber(),
  //                 nft_id: meta[0].item.toNumber(),
  //               };
  //             }
  //           }
  //         )
  //       ).then(data =>
  //         data.filter((item): item is tradeConfigOfProps => !!item)
  //       );
  //     }
  //   },
  // });

  const { bundleOf, isLoading } = useBundleOf({
    key: 'topBundle',
    filter: 'entries',
  });

  const { metaNFT } = useMetaNFT({
    key: 'topBundle',
    filter: bundleOf?.map(meta => ({
      collection_id: meta?.collection_id,
      nft_id: meta?.nft_id,
    })) as keyof typeof bundleOf,
  });

  const swiperRef = useRef<SwiperType>();

  if (isLoading) return <TopBundlesSkeleton />;

  return (
    <Box position="relative" role="group">
      <SwiperThumbsButton
        swiperRef={swiperRef}
        sx={{
          _first: { left: '-3%' },
          _last: { right: '-3%' },
        }}
      />

      <Swiper
        modules={[Mousewheel, Grid]}
        spaceBetween={32}
        slidesPerView={4}
        grid={{ rows: 2, fill: 'row' }}
        breakpoints={{}}
        mousewheel={{ forceToAxis: true }}
        onSwiper={swiper => (swiperRef.current = swiper)}
      >
        {bundleOf?.length ? (
          bundleOf.map(meta => {
            const currentMetaNFT = metaNFT?.find(
              data =>
                data?.collection_id === meta?.collection_id &&
                data?.nft_id === meta?.nft_id
            );

            return (
              <SwiperSlide key={meta?.trade_id}>
                <Link to={`/marketplace/bundle/${meta?.trade_id}`}>
                  <CardBox variant="baseStyle" padding={0}>
                    <Box
                      padding={2}
                      borderBottom="0.0625rem solid"
                      borderColor="shader.a.200"
                    >
                      <RatioPicture
                        alt={`topBundle/${meta?.trade_id}`}
                        src={
                          currentMetaNFT?.image
                            ? cloundinary_link(currentMetaNFT.image)
                            : null
                        }
                      />
                    </Box>

                    <Box
                      padding={4}
                      color="shader.a.900"
                      fontSize="sm"
                      fontWeight="medium"
                    >
                      <Center justifyContent="space-between">
                        <Text as="strong" fontWeight="inherit" fontSize="md">
                          {currentMetaNFT?.title || '-'}
                        </Text>

                        <Text color="shader.a.600">
                          ID:
                          <Text as="span" color="shader.a.900">
                            {meta?.trade_id}
                          </Text>
                        </Text>
                      </Center>

                      <Center justifyContent="space-between">
                        <Box>
                          <Text color="shader.a.600">Finish:</Text>

                          <DateBlock
                            // endBlock={endBlock.value.toNumber()}
                            endBlock={-1}
                            sx={{ as: 'span' }}
                          />
                        </Box>

                        <Box textAlign="right">
                          <Text color="shader.a.600">Price:</Text>

                          <GafiAmount
                            // amount={maybePrice.toString()}
                            amount={1}
                            sx={{
                              sx: {
                                '&, span': {
                                  fontSize: 'inherit',
                                  fontWeight: 'inherit',
                                  color: 'inherit',
                                },
                              },
                            }}
                          />
                        </Box>
                      </Center>
                    </Box>
                  </CardBox>
                </Link>
              </SwiperSlide>
            );
          })
        ) : (
          <Center>Empty</Center>
        )}
        {/* {data && data.length ? (
          React.Children.toArray(
            data.map(
              ({ collection_id, endBlock, maybePrice, nft_id, trade_id }) => {
                const currentNFT = metaNFT?.find(
                  data =>
                    data?.collection_id === collection_id &&
                    data.nft_id === nft_id
                );

                return (
                  <SwiperSlide>
                    <Link to={`/marketplace/bundle/${trade_id}`}>
                      <CardBox variant="baseStyle" padding={0}>
                        <Box
                          padding={2}
                          borderBottom="0.0625rem solid"
                          borderColor="shader.a.200"
                        >
                          <RatioPicture
                            alt={collection_id}
                            src={
                              currentNFT?.image
                                ? cloundinary_link(currentNFT.image)
                                : null
                            }
                          />
                        </Box>

                        <Box
                          padding={4}
                          color="shader.a.900"
                          fontSize="sm"
                          fontWeight="medium"
                        >
                          <Center justifyContent="space-between">
                            <Text
                              as="strong"
                              fontWeight="inherit"
                              fontSize="md"
                            >
                              {currentNFT?.title || '-'}
                            </Text>

                            <Text color="shader.a.600">
                              ID:
                              <Text as="span" color="shader.a.900">
                                {currentNFT?.nft_id}
                              </Text>
                            </Text>
                          </Center>

                          <Center justifyContent="space-between">
                            <Box>
                              <Text color="shader.a.600">Finish:</Text>

                              <DateBlock
                                endBlock={endBlock.value.toNumber()}
                                sx={{ as: 'span' }}
                              />
                            </Box>

                            <Box textAlign="right">
                              <Text color="shader.a.600">Price:</Text>

                              <GafiAmount
                                amount={maybePrice.toString()}
                                sx={{
                                  sx: {
                                    '&, span': {
                                      fontSize: 'inherit',
                                      fontWeight: 'inherit',
                                      color: 'inherit',
                                    },
                                  },
                                }}
                              />
                            </Box>
                          </Center>
                        </Box>
                      </CardBox>
                    </Link>
                  </SwiperSlide>
                );
              }
            )
          )
        ) : (
          <Center>Empty</Center>
        )} */}
      </Swiper>
    </Box>
  );
}
