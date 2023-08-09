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
  PalletGameAuctionConfig,
} from '@polkadot/types/lookup';
import useMetaNFT from 'hooks/useMetaNFT';
import CardBox from 'components/CardBox';
import DateBlock from 'components/DateBlock';
import GafiAmount from 'components/GafiAmount';
import useHighestBidOf from 'hooks/useHighestBidOf';
import SwiperThumbsButton from 'layouts/SwiperThumbs/SwiperThumbsButton';
import { Swiper as SwiperType } from 'swiper/types';
import SectionTopLoading from './SectionTopLoading';

interface auctionConfigOfProps {
  endBlock: u32;
  maybePrice: Option<u128>;
  trade_id: number;
  collection_id: number;
  nft_id: number;
}

export default function SectionTopAuction() {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { data, isLoading } = useQuery({
    queryKey: ['auctionOf', account?.address],
    queryFn: async () => {
      if (api) {
        const service = await api.query.game.bundleOf.entries();

        return Promise.all(
          service.map(
            async ([trade_id, meta]: [
              StorageKey<[u32]>,
              Vec<GafiSupportGameTypesPackage>
            ]) => {
              const auctionConfigOf = (await api.query.game.auctionConfigOf(
                trade_id.args[0].toNumber()
              )) as Option<PalletGameAuctionConfig>;

              if (auctionConfigOf.isSome) {
                return {
                  endBlock: auctionConfigOf.value.duration,
                  maybePrice: auctionConfigOf.value.maybePrice,
                  trade_id: trade_id.args[0].toNumber(),
                  collection_id: meta[0].collection.toNumber(),
                  nft_id: meta[0].item.toNumber(),
                };
              }
            }
          )
        ).then(data =>
          data.filter((item): item is auctionConfigOfProps => !!item)
        );
      }
    },
  });

  const { getHighestBidOf } = useHighestBidOf({
    key: `auctionOf/${account?.address}`,
    group: data?.map(({ trade_id }) => trade_id) as number[],
    filter: 'every',
  });

  const { metaNFT } = useMetaNFT({
    key: `auctionOf/${account?.address}`,
    group: data?.map(item => ({
      nft_id: item?.nft_id,
      collection_id: item?.collection_id,
    })),
  });

  const swiperRef = useRef<SwiperType>();

  if (isLoading) return <SectionTopLoading />;

  return (
    <>
      {data?.length ? (
        <>
          <Box position="relative" role="group">
            <SwiperThumbsButton
              swiperRef={swiperRef}
              sx={{
                _first: {
                  left: '-3%',
                },
                _last: {
                  right: '-3%',
                },
              }}
            />

            <Swiper
              modules={[Mousewheel, Grid]}
              spaceBetween={32}
              slidesPerView={4}
              grid={{ rows: 2, fill: 'row' }}
              mousewheel={{ forceToAxis: true }}
              onSwiper={swiper => (swiperRef.current = swiper)}
            >
              {React.Children.toArray(
                data.map(
                  ({
                    collection_id,
                    endBlock,
                    maybePrice,
                    nft_id,
                    trade_id,
                  }) => {
                    const currentNFT = metaNFT?.find(
                      data =>
                        data?.collection_id === collection_id &&
                        data.nft_id === nft_id
                    );

                    return (
                      <SwiperSlide>
                        <Link to={`/marketplace/auction/${trade_id}`}>
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
                                    endBlock={endBlock.toNumber()}
                                    sx={{ as: 'span' }}
                                  />
                                </Box>

                                <Box textAlign="right">
                                  <Text color="shader.a.600">Price:</Text>

                                  <GafiAmount
                                    amount={
                                      getHighestBidOf?.find(
                                        meta => meta?.trade_id === trade_id
                                      )?.maybePrice || maybePrice.toString()
                                    }
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
              )}
            </Swiper>
          </Box>
        </>
      ) : (
        <Center>Empty</Center>
      )}
    </>
  );
}
