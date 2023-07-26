import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  List,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import HeartIcon from 'public/assets/line/heart.svg';
import EyesIcon from 'public/assets/line/eye.svg';
import ShareIcon from 'public/assets/line/share.svg';
import VerifyIcon from 'public/assets/fill/verified.svg';
import Cart02Icon from 'public/assets/line/cart-02.svg';

import CardBox from 'components/CardBox';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from 'hooks/useRedux';
import { TypeMetadataOfItem } from 'types';
import { cloundinary_link } from 'axios/cloudinary_axios';
import { shorten } from 'utils/utils';

import React from 'react';

import {
  GafiSupportGameTypesPackage,
  PalletGameTradeConfig,
  PalletNftsItemDetails,
  PalletNftsItemMetadata,
} from '@polkadot/types/lookup';
import { Codec } from '@polkadot/types/types';
import { Option } from '@polkadot/types';
import NFTDetailSell from './NFTDetailSell';
import NFTDetailBuy from './NFTDetailBuy';

import NFTDetailOffer from './NFTDetailOffer';
import NFTDetailCancelOffer from './NFTDetailCancelOffer';
import NFTDetailAcceptOffer from './NFTDetailAcceptOffer';

interface getBundleProps {
  item_id: number;
  trade_id: number;
  amount: number;
  // trade: GafiSupportGameTypesTradeType;
}

export default function NFTDetail() {
  const { nft_id, collection_id } = useParams();

  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);

  const { data } = useQuery({
    queryKey: [`item_detail/${collection_id}/${nft_id}`],
    queryFn: async () => {
      if (api) {
        const ownerOfItem = await api.query.nfts
          .item(collection_id, nft_id)
          .then((meta: Codec) => {
            const service = meta as Option<PalletNftsItemDetails>;

            return service.value.owner.toString();
          });

        const metaOfItem = await api.query.nfts
          .itemMetadataOf(collection_id, nft_id)
          .then((meta: Codec): TypeMetadataOfItem | null => {
            const service = meta as Option<PalletNftsItemMetadata>;

            if (service.isSome) {
              return JSON.parse(String(service.value.data.toHuman()));
            }

            return null;
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
                // owner: ,
                amount: service.amount.toNumber(),
              };
            }
          })
          .filter((item): item is getBundleProps => !!item);

        const getPrice = (await api.query.game.tradeConfigOf.entries())
          .map(([trade_id, meta]) => {
            const service: PalletGameTradeConfig = meta.unwrap();

            return getBundle
              .map(data => {
                if (trade_id.args[0].toNumber() === data.trade_id) {
                  return {
                    trade: service.trade.toString(),
                    owner: service.owner.toString(),
                    trade_id: data.trade_id,
                    amount: data.amount,
                    maybePrice: service.maybePrice.isSome
                      ? service.maybePrice.toString()
                      : null,
                    startBlock: service.startBlock.isSome
                      ? service.startBlock.value.toNumber()
                      : null,
                    endBlock: service.endBlock.isSome
                      ? service.endBlock.value.toNumber()
                      : null,
                  };
                }
              })
              .filter(item => !!item) // cannot found trade_id [undefined, undefined]
              .find(item => !!item); // i don't want nested array [ { maybePrice: N } ] or [ {} ]
          })
          .filter(item => !!item); // remove undefined

        return {
          owner: ownerOfItem,
          bundle: getPrice,
          meta: metaOfItem,
        };
      }
    },
  });

  console.log('data', data);

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
                {data?.meta?.image ? (
                  <Image
                    alt="image is outdated"
                    objectFit="contain"
                    src={`${cloundinary_link}/${data?.meta.image}`}
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

            <CardBox variant="baseStyle">
              <Flex
                alignItems="center"
                gap={1}
                color="primary.a.500"
                fontWeight="medium"
              >
                <Heading fontSize="lg">{data.meta?.title || '-'}</Heading>

                {data.meta?.title && (
                  <Icon as={VerifyIcon} height={5} width={5} />
                )}
              </Flex>

              <Text color="shader.a.500">
                Item&nbsp;
                <Text as="span" color="primary.a.500" fontWeight="medium">
                  {data.bundle[0]?.amount || 0}
                </Text>
              </Text>

              <Text color="shader.a.500">
                Owned by
                <Text as="span" color="primary.a.500" fontWeight="medium">
                  &nbsp;
                  {account?.address === data.owner
                    ? 'You'
                    : shorten(data.owner, 6)}
                </Text>
              </Text>

              <CardBox variant="baseStyle">
                {(function () {
                  const newest = data.bundle
                    .filter(data => data?.trade === 'SetPrice')
                    .sort(
                      (a, b) => Number(b?.trade_id) - Number(a?.trade_id)
                    )[0];

                  return (
                    <Stack spacing={6}>
                      <Box
                        padding={4}
                        border="0.0625rem solid"
                        borderColor="shader.a.300"
                        bg="shader.a.200"
                        borderRadius="xl"
                      >
                        {newest?.maybePrice ? (
                          <Stack spacing={0.5}>
                            <Heading
                              as="h6"
                              fontSize="xl"
                              color="shader.a.900"
                              fontWeight="semibold"
                            >
                              {newest.maybePrice}
                            </Heading>

                            <Text fontSize="sm" color="shader.a.500">
                              {Intl.NumberFormat(undefined, {
                                style: 'currency',
                                currencyDisplay: 'narrowSymbol',
                                currency: 'usd',
                              }).format(Number(newest.maybePrice))}
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
                            <IconButton
                              aria-label="cart-icon"
                              display="flex"
                              variant="unstyled"
                              color="shader.a.900"
                              border="0.0625rem solid"
                              borderColor="shader.a.300"
                              borderRadius="full"
                              icon={
                                <Icon as={Cart02Icon} width={5} height={5} />
                              }
                            />

                            <NFTDetailOffer />

                            {newest?.trade_id && (
                              <NFTDetailBuy
                                trade_id={newest.trade_id}
                                fee={Number(newest.maybePrice)}
                              />
                            )}
                          </>
                        )}

                        {account?.address === data.owner && <NFTDetailSell />}
                      </Flex>
                    </Stack>
                  );
                })()}
              </CardBox>
            </CardBox>
          </Grid>

          <CardBox mt={4} variant="baseStyle" padding={0}>
            <Tabs variant="baseStyle">
              <TabList>
                <Tab>Offers</Tab>
              </TabList>
              <TabPanels>
                <TabPanel padding={0}>
                  <Table
                    variant="unstyled"
                    fontSize="sm"
                    sx={{
                      p: {
                        fontWeight: 'medium',
                        color: 'shader.a.900',
                      },
                      span: {
                        color: 'shader.a.500',
                      },
                    }}
                  >
                    <Tbody>
                      {React.Children.toArray(
                        data.bundle
                          .filter(data => data?.trade === 'SetBuy')
                          .map(meta => (
                            <Tr>
                              <Td>
                                <Text>{meta?.maybePrice} GAFI</Text>

                                <Text as="span">
                                  {Intl.NumberFormat(undefined, {
                                    style: 'currency',
                                    currencyDisplay: 'narrowSymbol',
                                    currency: 'usd',
                                  }).format(Number(meta?.maybePrice))}
                                </Text>
                              </Td>

                              <Td>
                                <Text as="span">Quantity</Text>

                                <Text>{meta?.amount}</Text>
                              </Td>

                              <Td>
                                <Text as="span">From</Text>

                                <Text color="primary.a.500!">
                                  {shorten(String(meta?.owner), 12)}
                                </Text>
                              </Td>

                              <Td>
                                <Text as="span">Date</Text>
                                <Text>2 hours ago</Text>
                              </Td>

                              <Td textAlign="right">
                                <NFTDetailCancelOffer
                                  trade_id={Number(meta?.trade_id)}
                                />

                                <NFTDetailAcceptOffer
                                  trade_id={Number(meta?.trade_id)}
                                  price={Number(meta?.maybePrice)}
                                  amount={Number(meta?.amount)}
                                />
                              </Td>
                            </Tr>
                          ))
                      )}
                    </Tbody>
                  </Table>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBox>
        </>
      )}
    </>
  );
}
