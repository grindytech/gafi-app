import { Box, Center, Flex, Heading, Icon, Text } from '@chakra-ui/react';

import { Grid, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import CollectionIcon from 'public/assets/line/collection-02.svg';

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import React from 'react';

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

interface gameAuctionOf {
  endBlock: u32;
  maybePrice: Option<u128>;
  trade_id: number;
  collection_id: number;
  nft_id: number;
}

export default function TopAuction() {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { data } = useQuery({
    queryKey: ['top_auctions', account?.address],
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
        ).then(data => data.filter((item): item is gameAuctionOf => !!item));
      }
    },
  });

  const { getHighestBidOf } = useHighestBidOf({
    key: '1',
    group: data?.map(({ trade_id }) => trade_id) as number[],
    filter: 'every',
  });

  const { metaNFT } = useMetaNFT({
    key: `auctionOf`,
    group: data?.map(item => ({
      nft_id: item?.nft_id,
      collection_id: item?.collection_id,
    })),
  });

  return (
    <Box color="shader.a.900">
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
        <Heading variant="sub02">Top Auctions</Heading>
      </Flex>

      <Box mt={6}>
        <Swiper
          modules={[Mousewheel, Grid]}
          spaceBetween={32}
          slidesPerView={4}
          grid={{ rows: 2, fill: 'row' }}
          mousewheel={{ forceToAxis: true }}
        >
          {data && data.length ? (
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
                      <Link to={`/marketplace/auction/${trade_id}`}>
                        <CardBox variant="baseStyle" padding={0}>
                          <Box>
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
                            fontWeight="medium"
                          >
                            <Center justifyContent="space-between">
                              <Text
                                as="strong"
                                fontWeight="medium"
                                color="shader.a.900"
                              >
                                {currentNFT?.title || '-'}
                              </Text>

                              <Text
                                fontSize="sm"
                                fontWeight="medium"
                                color="shader.a.600"
                                fontStyle="sm"
                              >
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
                                  sx={{
                                    as: 'span',
                                    fontSize: 'sm',
                                    fontWeight: 'inherit',
                                    color: 'inherit',
                                  }}
                                />
                              </Box>

                              <Box textAlign="right">
                                <Text fontSize="sm" color="shader.a.600">
                                  Price:
                                </Text>

                                <GafiAmount
                                  amount={
                                    getHighestBidOf?.find(
                                      meta => meta?.trade_id === trade_id
                                    )?.maybePrice || maybePrice.toString()
                                  }
                                  sx={{
                                    sx: {
                                      '&, span': {
                                        fontSize: 'sm',
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
          )}
        </Swiper>
      </Box>
    </Box>
  );
}
