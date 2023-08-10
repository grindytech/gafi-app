import { Box, Center, Flex, Heading, Icon, Text } from '@chakra-ui/react';

import { Grid, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import CollectionIcon from 'public/assets/line/collection-02.svg';

import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';

import { Link } from 'react-router-dom';

import RatioPicture from 'components/RatioPicture';
import CardBox from 'components/CardBox';
import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletGamePoolDetails } from '@polkadot/types/lookup';
import { formatGAFI } from 'utils/utils';
import DateBlock from 'components/DateBlock';
import SwiperThumbsButton from 'layouts/SwiperThumbs/SwiperThumbsButton';
import { Swiper as SwiperType } from 'swiper/types';
import { useRef } from 'react';

export default function TopPools() {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { data } = useQuery({
    queryKey: ['topPools', account?.address],
    queryFn: async () => {
      if (api) {
        const poolOf = await api.query.game.poolOf.entries();

        return poolOf.map(
          ([pool_id, meta]: [
            StorageKey<[u32]>,
            Option<PalletGamePoolDetails>
          ]) => {
            return {
              owner: meta.value.owner,
              endBlock: meta.value.mintSettings.endBlock,
              price: meta.value.mintSettings.price,
              poolType: meta.value.poolType,
              pool_id: pool_id.args[0],
            };
          }
        );
      }
    },
  });
  const swiperRef = useRef<SwiperType>();

  return (
    <Box color="shader.a.900">
      <Flex gap={3} alignItems="center">
        <Icon
          as={CollectionIcon}
          h={6}
          w={6}
          sx={{
            path: { stroke: 'url(#CollectionLinear06)' },
          }}
        />
        <Heading variant="sub02">Top Pools</Heading>
      </Flex>

      <Box mt={6} role="group" position="relative">
        {data?.length ? (
          <>
            {data.length >= 5 && (
              <SwiperThumbsButton
                swiperRef={swiperRef}
                sx={{
                  _first: { left: '-2.5%' },
                  _last: { right: '-2.5%' },
                }}
              />
            )}

            <Swiper
              loop={true}
              modules={[Mousewheel, Grid]}
              spaceBetween={32}
              slidesPerView={4}
              grid={{ rows: 1 }}
              breakpoints={{}}
              mousewheel={{ forceToAxis: true }}
              onSwiper={swiper => (swiperRef.current = swiper)}
            >
              {data.map(meta => (
                <SwiperSlide key={meta.pool_id.toNumber()}>
                  <CardBox variant="baseStyle" padding={0}>
                    <Link to={`/marketplace/pool/${meta.pool_id.toNumber()}`}>
                      <Box
                        padding={2}
                        borderBottom="0.0625rem solid"
                        borderColor="shader.a.200"
                      >
                        <RatioPicture src={null} />
                      </Box>

                      <Box padding={4}>
                        <Center justifyContent="space-between">
                          <Text color="shader.a.900" fontWeight="medium">
                            {meta.poolType.toString()}
                          </Text>

                          <Text
                            fontSize="sm"
                            color="shader.a.600"
                            fontWeight="medium"
                          >
                            ID:&nbsp;
                            <Text as="span" color="shader.a.900">
                              {meta.pool_id.toNumber()}
                            </Text>
                          </Text>
                        </Center>

                        <Center
                          justifyContent="space-between"
                          fontSize="sm"
                          fontWeight="medium"
                          color="shader.a.900"
                        >
                          <Text display="flex" flexDirection="column">
                            Price:
                            <Text as="span" color="shader.a.900">
                              {formatGAFI(meta.price.toString())} GAFI
                            </Text>
                          </Text>

                          <Text
                            display="flex"
                            flexDirection="column"
                            textAlign="right"
                          >
                            End at:
                            <DateBlock
                              end={
                                meta.endBlock.isSome ? 'Expired' : 'Infinity'
                              }
                              endBlock={
                                meta.endBlock.isSome
                                  ? meta.endBlock.value.toNumber()
                                  : -1
                              }
                              sx={{ as: 'span', color: 'shader.a.900' }}
                            />
                          </Text>
                        </Center>
                      </Box>
                    </Link>
                  </CardBox>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        ) : (
          <Center>Empty</Center>
        )}
      </Box>
    </Box>
  );
}
