import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Option, Vec } from '@polkadot/types';
import { GafiSupportGameTypesLoot } from '@polkadot/types/lookup';
import { PalletGamePoolDetails } from '@polkadot/types/lookup';
import { isNull, isUndefined } from '@polkadot/util';
import { useQuery } from '@tanstack/react-query';
import { cloundinary_link } from 'axios/cloudinary_axios';
import CardBox from 'components/CardBox';
import DateBlock from 'components/DateBlock';
import NumberInputMaxLength from 'components/NumberInput/NumberInputMaxLength';
import RatioPicture from 'components/RatioPicture';
import useMetaCollection from 'hooks/useMetaCollection';
import useMetaNFT from 'hooks/useMetaNFT';
import { useAppSelector } from 'hooks/useRedux';
import useSignAndSend from 'hooks/useSignAndSend';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  CalculatorOfRarity,
  ColorOfRarity,
  formatCurrency,
  formatGAFI,
  shorten,
  sumGAFI,
} from 'utils/utils';
import PoolDetailSuccess from './PoolDetailSuccess';

export default function PoolDetail() {
  const { api } = useAppSelector(state => state.substrate);
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['pool_detail', id],
    queryFn: async () => {
      if (api) {
        const poolOf = (await api.query.game.poolOf(
          id
        )) as Option<PalletGamePoolDetails>;

        const lootTableOf = (await api.query.game.lootTableOf(
          id
        )) as Vec<GafiSupportGameTypesLoot>;

        return Promise.all(
          lootTableOf.map(async (meta: GafiSupportGameTypesLoot) => {
            // should return Infinity
            if (meta.maybeNft.isEmpty) {
              return {
                weight: meta.weight.toNumber(),
                owner: poolOf.value.owner.toString(),
                price: poolOf.value.mintSettings.price.toString(),
              };
            }

            const getSupply = await api.query.game.supplyOf(
              meta.maybeNft.value.collection.toNumber(),
              meta.maybeNft.value.item.toNumber()
            );

            return {
              supply: getSupply.value.toString(),
              maybeNft: meta.maybeNft.value,
              weight: meta.weight.toNumber(),
              owner: poolOf.value.owner.toString(),
              endBlock: poolOf.value.mintSettings.endBlock,
              price: poolOf.value.mintSettings.price.toString(),
            };
          })
        );
      }
    },
  });

  const { metaNFT } = useMetaNFT({
    key: id,
    group: data
      ?.filter(({ maybeNft }) => !!maybeNft)
      .map(({ maybeNft }) => ({
        collection_id: Number(maybeNft?.collection.toNumber()),
        nft_id: Number(maybeNft?.item.toNumber()),
      })),
  });

  const { metaCollection } = useMetaCollection({
    key: id,
    group: data
      ?.filter(({ maybeNft }) => !!maybeNft)
      .map(({ maybeNft }) => ({
        collection_id: Number(maybeNft?.collection.toNumber()),
      })),
  });

  const { isLoading, mutation } = useSignAndSend({
    key: ['123'],
    address: account?.address as string,
    onSuccess: () => {
      onOpen();
    },
  });

  const { isOpen, onClose, onOpen } = useDisclosure();
  const { control, watch, handleSubmit, reset } = useForm();
  const { amount } = watch();

  const price = data?.find(meta => meta.price)?.price || '0';

  return (
    <>
      {isOpen && (
        <PoolDetailSuccess
          onClose={onClose}
          onCloseSuccess={() => {}}
          reset={reset}
        />
      )}

      {data?.length ? (
        <Grid gridTemplateColumns="repeat(6, 1fr)" gap={5}>
          <GridItem colSpan={{ base: 6, lg: 4 }}>
            <Grid
              gridTemplateColumns={{
                lg: 'repeat(2, 1fr)',
                xl: 'repeat(3, 1fr)',
              }}
              gap={4}
            >
              {React.Children.toArray(
                data.map(meta => {
                  const rarity = CalculatorOfRarity(
                    meta.weight,
                    data.map(item => item.weight)
                  );

                  const currentNFT = metaNFT?.find(
                    data =>
                      data?.nft_id === meta.maybeNft?.item.toNumber() &&
                      data?.collection_id ===
                        meta.maybeNft?.collection.toNumber()
                  );

                  const currentCollection = metaCollection?.find(
                    data =>
                      data?.collection_id ===
                      meta.maybeNft?.collection.toNumber()
                  );

                  const isFailed = isUndefined(meta.maybeNft?.collection);
                  const isInfinity = isUndefined(meta.supply);

                  return (
                    <Box
                      border="0.0625rem solid"
                      borderColor="shader.a.200"
                      borderRadius="xl"
                      bg="white"
                      boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.10)"
                    >
                      <Box position="relative">
                        <RatioPicture
                          src={
                            currentNFT?.image
                              ? cloundinary_link(currentNFT.image)
                              : null
                          }
                        />

                        <RatioPicture
                          src={
                            currentCollection?.image
                              ? cloundinary_link(currentCollection.image)
                              : null
                          }
                          sx={{
                            ml: 4,
                            mb: -4,
                            width: 14,
                            height: 14,
                            position: 'absolute',
                            inset: 'auto auto 0 0',
                            borderRadius: '0.625rem',
                            border: '0.25rem solid white',
                          }}
                        />
                      </Box>

                      <Box padding={4} pt={6} fontSize="sm">
                        <Text color={isFailed ? 'second.red' : 'shader.a.500'}>
                          {isFailed ? 'Failed' : 'Title collection'}
                        </Text>

                        <Center
                          gap={4}
                          justifyContent="space-between"
                          fontWeight="medium"
                        >
                          <Text
                            color={isFailed ? 'second.red' : 'shader.a.900'}
                            fontSize="md"
                          >
                            {isFailed ? 'Good luck next time' : 'Title NFT'}
                          </Text>

                          {!isFailed && (
                            <Text as="span" color="shader.a.900">
                              ID: {meta.maybeNft?.item.toNumber()}
                            </Text>
                          )}
                        </Center>

                        <Center justifyContent="space-between" gap={4}>
                          {!isInfinity && (
                            <Text fontSize="sm" color="shader.a.900">
                              Amount:&nbsp;
                              <Text as="span" fontWeight="medium">
                                {meta.supply || 'Infinity'}
                              </Text>
                            </Text>
                          )}

                          <Text fontSize="sm" color="shader.a.900">
                            Rarity:&nbsp;
                            <Text
                              as="span"
                              fontWeight="medium"
                              color={ColorOfRarity(rarity)}
                            >
                              {rarity}%
                            </Text>
                          </Text>
                        </Center>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Grid>
          </GridItem>

          <GridItem
            colSpan={{ base: 6, lg: 2 }}
            gridRow={{ base: 1, lg: 'unset' }}
          >
            <CardBox
              as="form"
              onSubmit={handleSubmit(() => {
                if (api && account?.address) {
                  mutation(
                    api.tx.game.mint(
                      Number(id),
                      account.address,
                      sumGAFI(price, amount, true)
                    )
                  );
                }
              })}
              padding={0}
              variant="baseStyle"
              position="sticky"
              top={{
                base: '4.5rem',
                lg: 20,
              }}
            >
              <Box padding={6}>
                <Heading fontSize="lg" fontWeight="medium" color="shader.a.900">
                  Pool ID {id}
                </Heading>

                <Text color="shader.a.500" mt={1}>
                  Owned by&nbsp;
                  <Text as="span" color="primary.a.500" fontWeight="medium">
                    {shorten(data.find(meta => meta.owner)?.owner as string)}
                  </Text>
                </Text>

                <Box
                  mt={4}
                  borderRadius="xl"
                  border="0.0625rem solid"
                  borderColor="shader.a.300"
                >
                  <Text
                    color="shader.a.500"
                    padding={4}
                    borderBottom="0.0625rem solid"
                    borderColor="shader.a.200"
                  >
                    Finish in&nbsp;
                    {(function () {
                      const endBlock = data.find(
                        meta => meta.endBlock
                      )?.endBlock;

                      return (
                        <DateBlock
                          end={endBlock?.isSome ? 'Expired' : 'Infinity'}
                          endBlock={
                            endBlock?.isSome ? endBlock.value.toNumber() : -1
                          }
                          sx={{
                            as: 'span',
                            color: 'shader.a.900',
                            fontWeight: 'medium',
                          }}
                        />
                      );
                    })()}
                  </Text>

                  <Box padding={6}>
                    <NumberInputMaxLength
                      heading="Amount"
                      formState={{
                        control,
                        value: 'amount',
                        isInvalid: isNull(amount),
                        isRequired: true,
                        max: 10,
                        min: 1,
                      }}
                      sx={
                        {
                          flexDirection: 'column',
                          isDisabled: isLoading,
                        } as any
                      }
                    />

                    <Text mt={4} color="shader.a.500" fontSize="sm">
                      Mint fee&nbsp;
                      <Text as="span" fontWeight="medium" color="shader.a.900">
                        {formatGAFI(price)}
                        &nbsp; GAFI
                      </Text>
                    </Text>
                  </Box>
                </Box>
              </Box>

              <Box
                padding={6}
                borderTop="0.0625rem solid"
                borderColor="shader.a.200"
              >
                <Center justifyContent="space-between">
                  <Text color="shader.a.500" fontWeight="medium">
                    Total Purchase
                  </Text>

                  <Box textAlign="right">
                    <Text
                      as="strong"
                      fontSize="xl"
                      fontWeight="semibold"
                      color="primary.a.500"
                    >
                      {sumGAFI(price, amount || 0)}
                      &nbsp; GAFI
                    </Text>

                    <Text color="shader.a.500" fontSize="sm">
                      {formatCurrency(
                        Number(sumGAFI(price, amount || 0, true))
                      )}
                    </Text>
                  </Box>
                </Center>

                <Button
                  variant="primary"
                  borderRadius="3xl"
                  type="submit"
                  fontSize="sm"
                  mt={4}
                  isLoading={isLoading}
                  _hover={{}}
                  width="full"
                >
                  Sign & Submit
                </Button>
              </Box>
            </CardBox>
          </GridItem>
        </Grid>
      ) : null}
    </>
  );
}
