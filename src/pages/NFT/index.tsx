import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  List,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import HeartIcon from 'public/assets/line/heart.svg';
import EyesIcon from 'public/assets/line/eye.svg';
import ShareIcon from 'public/assets/line/share.svg';

import CardBox from 'components/CardBox';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import { cloundinary_link } from 'axios/cloudinary_axios';

import {
  GafiSupportGameTypesPackage,
  GafiSupportGameTypesTradeType,
  PalletGameTradeConfig,
} from '@polkadot/types/lookup';

import { Option, StorageKey, Vec, u128, u32 } from '@polkadot/types';
import NFTDetailSell from './NFTDetailSell';
import NFTDetailBuy from './NFTDetailBuy';

import NFTDetailOffer from './NFTDetailOffer';
import NFTDetailListOffer from './NFTDetailListOffer';
import { AccountId32 } from '@polkadot/types/interfaces';
import NFTDetailListing from './NFTDetailListing';
import React from 'react';
import useSubscribeSystem from 'hooks/useSubscribeSystem';
import useMetaCollection from 'hooks/useMetaCollection';
import useMetaNFT from 'hooks/useMetaNFT';
import { formatCurrency, shorten } from 'utils/utils';
import NFTDetailListNFT from './NFTDetailListNFT';
import useGetNFT, { nftsItemProps } from 'hooks/useGetNFT';
import RatioPicture from 'components/RatioPicture';

import DateBlock from 'components/DateBlock';

export interface getTradeConfigProps {
  trade: GafiSupportGameTypesTradeType;
  owner: AccountId32;
  trade_id: number;
  amount: number;
  maybePrice: Option<u128>;
  startBlock: Option<u32>;
  endBlock: Option<u32>;
}

export default function NFT() {
  const { nft_id, collection_id } = useParams();

  const { event, setEvent } = useSubscribeSystem();

  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const getNFT = useGetNFT<nftsItemProps>({
    group: [Number(collection_id)],
    filter: 'only',
  });

  const { data, refetch } = useQuery({
    queryKey: [`item_detail/${nft_id}/${collection_id}`],
    queryFn: async () => {
      if (api) {
        const getBundle = (await api.query.game.bundleOf.entries())
          .map(
            ([trade_id, [service]]: [
              StorageKey<[u32]>,
              Vec<GafiSupportGameTypesPackage>
            ]) => {
              if (
                service.collection.toNumber() === Number(collection_id) &&
                service.item.toNumber() === Number(nft_id)
              ) {
                return {
                  trade_id: trade_id.args[0].toNumber(),
                  amount: service.amount.toNumber(),
                };
              }
            }
          )
          .filter((item): item is NonNullable<typeof item> => !!item);

        const getTradeConfig = (await api.query.game.tradeConfigOf.entries())
          .map(
            ([trade_id, service]: [
              StorageKey<[u32]>,
              Option<PalletGameTradeConfig>
            ]) => {
              return getBundle
                .map(data => {
                  if (trade_id.args[0].toNumber() === data.trade_id) {
                    return {
                      trade: service.value.trade,
                      owner: service.value.owner,
                      trade_id: data.trade_id,
                      amount: data.amount,
                      maybePrice: service.value.maybePrice,
                      startBlock: service.value.startBlock,
                      endBlock: service.value.endBlock,
                    };
                  }
                })
                .find(item => !!item);
            }
          )
          .filter((item): item is getTradeConfigProps => !!item);

        return {
          bundle: getTradeConfig,
        };
      }
    },
  });

  const { metaCollection } = useMetaCollection({
    key: `${nft_id}/${collection_id}`,
    group: [
      {
        collection_id: Number(collection_id),
      },
    ],
  });

  const { metaNFT } = useMetaNFT({
    key: `${nft_id}/${collection_id}`,
    group: [
      {
        collection_id: Number(collection_id),
        nft_id: Number(nft_id),
      },
    ],
  });

  React.useEffect(() => {
    if (event) {
      event.forEach(({ eventName, eventValue }) => {
        const refetching = () => {
          const [, , collection, item] = JSON.parse(eventValue);

          if (Number(nft_id) === item && Number(collection_id) === collection) {
            refetch();
          }

          setEvent([]);
        };

        if (eventName === 'game::PriceSet') {
          refetching();
        }

        if (eventName === 'game::BuySet') {
          refetching();
        }
      });
    }
  }, [event]);

  const newestSetPrice = data?.bundle
    .filter(meta => meta.trade.type === 'SetPrice' && meta.amount)
    .sort((a, b) => b.trade_id - a.trade_id);

  const lowestSetBuy = data?.bundle
    .filter(meta => meta.trade.type === 'SetBuy' && meta.amount)
    .sort(
      (a, b) => a.maybePrice.value.toNumber() - b.maybePrice.value.toNumber()
    );

  const isSelled = newestSetPrice?.[0]?.maybePrice.isSome || false;

  return (
    <>
      {!!data && (
        <>
          <Grid
            gap={4}
            gridTemplateColumns={{
              lg: 'repeat(2, 1fr)',
            }}
          >
            <Box
              position={{ lg: 'sticky' }}
              top={24}
              zIndex={1}
              borderRadius="2xl"
              bg="white"
              border="0.0625rem solid"
              borderColor="shader.a.300"
              overflow="hidden"
              height="fit-content"
            >
              <RatioPicture
                alt={nft_id}
                src={
                  metaNFT?.[0]?.image
                    ? cloundinary_link(metaNFT?.[0]?.image)
                    : null
                }
                sx={{ ratio: { base: 16 / 9, lg: 1 / 1 } }}
              />

              <List
                padding={6}
                display="flex"
                fontWeight="medium"
                color="shader.a.900"
                gap={6}
                sx={{
                  li: {
                    display: 'inherit',
                    alignItems: 'center',
                    gap: 2,
                  },
                  svg: {
                    width: 5,
                    height: 5,
                  },
                }}
              >
                <ListItem>
                  <Button
                    variant="unstyled"
                    height="auto"
                    display="flex"
                    fontWeight="inherit"
                    leftIcon={<Icon as={HeartIcon} color="primary.a.500" />}
                  >
                    12
                  </Button>
                </ListItem>

                <ListItem>
                  <Icon as={EyesIcon} />

                  <Text>144</Text>
                </ListItem>

                <ListItem flex={1} justifyContent="flex-end">
                  <Button
                    variant="unstyled"
                    height="auto"
                    display="flex"
                    fontWeight="inherit"
                    leftIcon={<ShareIcon />}
                  >
                    Share
                  </Button>
                </ListItem>
              </List>
            </Box>

            <CardBox variant="baseStyle" height="fit-content">
              <VStack spacing={1} alignItems="flex-start">
                <Box>
                  <Heading
                    fontSize="lg"
                    color="primary.a.500"
                    fontWeight="medium"
                  >
                    {metaCollection?.[0]?.title || '-'}
                  </Heading>

                  <Heading
                    as="h6"
                    fontSize="2xl"
                    color="shader.a.900"
                    fontWeight="bold"
                  >
                    {metaNFT?.[0]?.title || '-'}
                  </Heading>
                </Box>

                <Text color="shader.a.500">
                  Owned by
                  <Text as="span" color="primary.a.500" fontWeight="medium">
                    &nbsp;
                    {account?.address === getNFT?.owner
                      ? 'You'
                      : shorten(getNFT.owner, 6)}
                  </Text>
                </Text>

                {newestSetPrice?.length ? (
                  <Text color="shader.a.500">
                    Amount&nbsp;
                    <Text as="span" color="primary.a.500" fontWeight="medium">
                      {newestSetPrice?.[0].amount || 0}
                    </Text>
                  </Text>
                ) : null}
              </VStack>

              <CardBox variant="baseStyle" mt={6}>
                <Stack spacing={6}>
                  {isSelled && (
                    <Text color="shader.a.500" fontSize="sm">
                      Sell end at&nbsp;
                      <DateBlock
                        endBlock={Number(
                          newestSetPrice?.[0].endBlock.value.toNumber()
                        )}
                        sx={{
                          as: 'span',
                          color: 'shader.a.900',
                          fontWeight: 'medium',
                          fontSize: 'md',
                        }}
                      />
                    </Text>
                  )}

                  <Box
                    padding={4}
                    border="0.0625rem solid"
                    borderColor="shader.a.300"
                    bg="shader.a.200"
                    borderRadius="xl"
                  >
                    {isSelled ? (
                      <Stack spacing={0.5}>
                        <Text
                          fontSize="xl"
                          color="shader.a.900"
                          fontWeight="semibold"
                        >
                          {newestSetPrice?.[0].maybePrice.toString()}
                        </Text>

                        <Text fontSize="sm" color="shader.a.500">
                          {formatCurrency(
                            Number(
                              newestSetPrice?.[0].maybePrice.value.toNumber()
                            ),
                            'usd'
                          )}
                        </Text>
                      </Stack>
                    ) : (
                      <Stack spacing={0.5}>
                        <Text fontSize="sm" color="shader.a.500">
                          Price
                        </Text>

                        <Text
                          fontSize="lg"
                          color="shader.a.900"
                          fontWeight="medium"
                        >
                          Not for sale
                        </Text>
                      </Stack>
                    )}
                  </Box>

                  <Flex gap={2}>
                    {newestSetPrice?.[0]?.trade.isEmpty && (
                      <NFTDetailOffer
                        fee={lowestSetBuy?.[0]?.maybePrice.value.toNumber()}
                        amount={newestSetPrice[0].amount}
                      />
                    )}

                    {account?.address !== getNFT?.owner &&
                      newestSetPrice?.[0]?.trade.isEmpty && (
                        <NFTDetailBuy
                          trade_id={newestSetPrice[0].trade_id}
                          fee={newestSetPrice[0].maybePrice.value.toNumber()}
                          amount={newestSetPrice[0].amount}
                        />
                      )}

                    {account?.address === getNFT?.owner && <NFTDetailSell />}
                  </Flex>
                </Stack>
              </CardBox>
            </CardBox>
          </Grid>

          <CardBox mt={4} variant="baseStyle" padding={0}>
            <Tabs variant="baseStyle">
              <TabList>
                <Tab>Offers</Tab>
                <Tab>Listings</Tab>
              </TabList>
              <TabPanels
                sx={{
                  '> div': {
                    padding: 0,
                    overflowX: 'auto',
                  },
                }}
              >
                <TabPanel>
                  <NFTDetailListOffer
                    lowestSetBuy={lowestSetBuy}
                    refetch={refetch}
                  />
                </TabPanel>

                <TabPanel>
                  <NFTDetailListing
                    newestSetPrice={newestSetPrice}
                    refetch={refetch}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBox>

          <NFTDetailListNFT />
        </>
      )}
    </>
  );
}
