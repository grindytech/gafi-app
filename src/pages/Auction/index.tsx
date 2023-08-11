import { Box, Flex, Grid, VStack } from '@chakra-ui/react';

import CardBox from 'components/CardBox';

import { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/useRedux';

import { Option, Vec } from '@polkadot/types';
import {
  GafiSupportGameTypesPackage,
  PalletGameAuctionConfig,
} from '@polkadot/types/lookup';

import useMetaNFT from 'hooks/useMetaNFT';

import { Swiper as SwiperType } from 'swiper/types';

import BundleLayoutModel from 'layouts/BundleLayout/BundleLayoutModel';
import BundleLayoutMenu from 'layouts/BundleLayout/BundleLayoutMenu';
import BundleLayoutDuration from 'layouts/BundleLayout/BundleLayoutDuration';
import BundleLayoutItems from 'layouts/BundleLayout/BundleLayoutItems';
import BundleLayoutOwner from 'layouts/BundleLayout/BundleLayoutOwner';

import useHighestBidOf from 'hooks/useHighestBidOf';
import AuctionBid from './AuctionBid';
import AuctionClaim from './AuctionClaim';

export default function Auction() {
  const { api } = useAppSelector(state => state.substrate);
  const { id } = useParams();
  const navigation = useNavigate();

  const { data, isError } = useQuery({
    queryKey: ['auctionOf', id],
    queryFn: async () => {
      if (api) {
        const service = (await api.query.game.bundleOf(
          id
        )) as Vec<GafiSupportGameTypesPackage>;

        const configOf = (await api.query.game.auctionConfigOf(
          id
        )) as Option<PalletGameAuctionConfig>;

        return {
          owner: configOf.value.owner.toString(),
          maybePrice: configOf.value.maybePrice.toString(),
          endBlock: configOf.value.duration.toNumber(),
          startBlock: configOf.value.startBlock.toNumber(),
          meta: service.map(meta => meta),
        };
      }
    },
  });

  const { getHighestBidOf } = useHighestBidOf({
    key: id,
    group: [Number(id)],
    filter: 'only',
  });

  const { metaNFT } = useMetaNFT({
    key: `auction/${id}`,
    group: data?.meta.map(meta => ({
      nft_id: meta.item.toNumber(),
      collection_id: meta.collection.toNumber(),
    })),
  });

  const swiperRef = useRef<SwiperType>();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (isError) return <>not found</>;

  const ListMenu = [
    {
      key: 0,
      heading: 'Detail',
      onClick: () => {
        if (swiperRef.current && data) {
          const response = data.meta[swiperRef.current.realIndex];

          navigation({
            pathname: `/marketplace/nft/${response.item.toNumber()}/${response.collection.toNumber()}`,
          });
        }
      },
    },
  ];

  return (
    <Box>
      {data ? (
        <>
          <Grid gridTemplateColumns={{ lg: 'repeat(2, 1fr)' }} gap={5}>
            <BundleLayoutModel
              data={data.meta}
              metaNFT={metaNFT}
              swiperRef={swiperRef}
              thumbs={thumbsSwiper}
            >
              <BundleLayoutMenu swiperRef={swiperRef} menu={ListMenu} />
            </BundleLayoutModel>

            <VStack alignItems="flex-start" gap={4}>
              <CardBox variant="baseStyle">
                <BundleLayoutOwner owner={data?.owner} />

                <BundleLayoutDuration
                  maybePrice={
                    getHighestBidOf?.[0]?.maybePrice || data.maybePrice
                  }
                  duration={{
                    heading: 'Auction end at',
                    endBlock: data.endBlock,
                  }}
                >
                  <Flex gap={3}>
                    <AuctionBid />

                    <AuctionClaim />
                  </Flex>
                </BundleLayoutDuration>
              </CardBox>

              <BundleLayoutItems
                queryKey={`auction/${id}`}
                heading="Auctions detail"
                data={data.meta}
                setThumbsSwiper={setThumbsSwiper}
              />
            </VStack>
          </Grid>
        </>
      ) : null}
    </Box>
  );
}
