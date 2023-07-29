import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
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
import { shorten } from 'utils/utils';

import {
  GafiSupportGameTypesPackage,
  GafiSupportGameTypesTradeType,
  PalletGameTradeConfig,
  PalletNftsItemDetails,
} from '@polkadot/types/lookup';
import { Codec } from '@polkadot/types/types';
import { Option, u128, u32 } from '@polkadot/types';
import NFTDetailSell from './NFTDetailSell';
import NFTDetailBuy from './NFTDetailBuy';

import NFTDetailOffer from './NFTDetailOffer';
import NFTDetailListOffer from './NFTDetailListOffer';
import { AccountId32 } from '@polkadot/types/interfaces';
import NFTDetailListing from './NFTDetailListing';
import React from 'react';
import useSubscribeSystem from 'hooks/useSubscribeSystem';
import NFTDetailOwner from './NFTDetailOwner';
import useMetaCollection from 'hooks/useMetaCollection';
import useMetaNFT from 'hooks/useMetaNFT';

export interface getTradeConfigProps {
  trade: GafiSupportGameTypesTradeType;
  owner: AccountId32;
  trade_id: number;
  amount: number;
  maybePrice: Option<u128>;
  startBlock: Option<u32>;
  endBlock: Option<u32>;
}

export default function NFTDetail() {
  const { nft_id, collection_id } = useParams();
  const { event, setEvent } = useSubscribeSystem();

  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { data, refetch } = useQuery({
    queryKey: [`item_detail/${collection_id}/${nft_id}`],
    queryFn: async () => {
      if (api) {
        const ownerOfItem = await api.query.nfts
          .item(collection_id, nft_id)
          .then((meta: Codec): string => {
            const service = meta as Option<PalletNftsItemDetails>;

            return service.value.owner.toString();
          });

        const getBundle = (await api.query.game.bundleOf.entries())
          .map(([trade_id, meta]) => {
            const service: GafiSupportGameTypesPackage = meta[0];

            if (
              service.collection.toNumber() === Number(collection_id) &&
              service.item.toNumber() === Number(nft_id)
            ) {
              return {
                trade_id: trade_id.args[0].toNumber(),
                amount: service.amount.toNumber(),
              };
            }
          })
          .filter((item): item is NonNullable<typeof item> => !!item);

        const getTradeConfig = (await api.query.game.tradeConfigOf.entries())
          .map(([trade_id, meta]) => {
            const service: PalletGameTradeConfig = meta.unwrap();

            return getBundle
              .map(data => {
                if (trade_id.args[0].toNumber() === data.trade_id) {
                  return {
                    trade: service.trade,
                    owner: service.owner,
                    trade_id: data.trade_id,
                    amount: data.amount,
                    maybePrice: service.maybePrice,
                    startBlock: service.startBlock,
                    endBlock: service.endBlock,
                  };
                }
              })
              .find(item => !!item);
          })
          .filter((item): item is getTradeConfigProps => !!item);

        return {
          owner: ownerOfItem,
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
              <Center
                bg="shader.a.300"
                sx={{
                  img: {
                    aspectRatio: {
                      base: 16 / 9,
                      lg: 1 / 1,
                    },
                    width: 'full',
                    height: 'full',
                  },
                }}
              >
                {metaNFT?.[0]?.image ? (
                  <Image
                    alt="image is outdated"
                    objectFit="contain"
                    src={`${cloundinary_link}/${metaNFT[0].image}`}
                  />
                ) : (
                  <Image src="/assets/fill/item.png" objectFit="none" />
                )}
              </Center>

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

                  <Text fontSize="2xl" color="shader.a.900" fontWeight="bold">
                    {metaNFT?.[0]?.title || '-'}
                  </Text>
                </Box>

                <Text color="shader.a.500">
                  Owned by
                  <Text as="span" color="primary.a.500" fontWeight="medium">
                    &nbsp;
                    {account?.address === data.owner
                      ? 'You'
                      : shorten(data.owner, 6)}
                  </Text>
                </Text>

                <Flex gap={2}>
                  {newestSetPrice?.length ? (
                    <Text color="shader.a.500">
                      Amount&nbsp;
                      <Text as="span" color="primary.a.500" fontWeight="medium">
                        {newestSetPrice?.[0].amount || 0}
                      </Text>
                    </Text>
                  ) : null}

                  <NFTDetailOwner />
                </Flex>
              </VStack>

              <CardBox variant="baseStyle" mt={6}>
                <Stack spacing={6}>
                  <Box
                    padding={4}
                    border="0.0625rem solid"
                    borderColor="shader.a.300"
                    bg="shader.a.200"
                    borderRadius="xl"
                  >
                    {newestSetPrice?.[0]?.maybePrice.isSome ? (
                      <Stack spacing={0.5}>
                        <Heading
                          as="h6"
                          fontSize="xl"
                          color="shader.a.900"
                          fontWeight="semibold"
                        >
                          {newestSetPrice[0].maybePrice.toString()}
                        </Heading>

                        <Text fontSize="sm" color="shader.a.500">
                          {Intl.NumberFormat(undefined, {
                            style: 'currency',
                            currencyDisplay: 'narrowSymbol',
                            currency: 'usd',
                          }).format(
                            newestSetPrice[0].maybePrice.value.toNumber()
                          )}
                        </Text>
                      </Stack>
                    ) : (
                      <Stack spacing={0.5}>
                        <Heading
                          as="h6"
                          fontSize="sm"
                          color="shader.a.500"
                          fontWeight="normal"
                        >
                          Price
                        </Heading>

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
                    {account?.address !== data.owner && (
                      <>
                        {newestSetPrice?.[0]?.trade.isEmpty && (
                          <NFTDetailOffer
                            fee={lowestSetBuy?.[0]?.maybePrice.value.toNumber()}
                            amount={newestSetPrice[0].amount}
                          />
                        )}

                        {newestSetPrice?.[0]?.trade.isEmpty && (
                          <NFTDetailBuy
                            trade_id={newestSetPrice[0].trade_id}
                            fee={newestSetPrice[0].maybePrice.value.toNumber()}
                            amount={newestSetPrice[0].amount}
                          />
                        )}
                      </>
                    )}

                    {account?.address === data.owner && <NFTDetailSell />}
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
        </>
      )}
    </>
  );
}
