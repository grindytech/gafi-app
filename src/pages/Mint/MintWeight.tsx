import {
  Box,
  Center,
  CircularProgress,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Vec } from '@polkadot/types';

import { GafiSupportGameTypesLoot } from '@polkadot/types/lookup';
import { isNull, isUndefined } from '@polkadot/util';
import { useQuery } from '@tanstack/react-query';
import { cloundinary_link } from 'axios/cloudinary_axios';
import CardBox from 'components/CardBox';
import DateBlock from 'components/DateBlock';
import GafiAmount from 'components/GafiAmount';
import RatioPicture from 'components/RatioPicture';
import useMetaCollection, {
  useMetaCollectionProps,
} from 'hooks/useMetaCollection';
import useMetaNFT, { useMetaNFTProps } from 'hooks/useMetaNFT';
import usePoolOf from 'hooks/usePoolOf';

import { useAppSelector } from 'hooks/useRedux';

import React from 'react';

import {
  CalculatorOfRarity,
  ColorOfRarity,
  formatGAFI,
  shorten,
} from 'utils/utils';

interface MintWeightProps {
  pool_id: string;
}

interface lootTableOfMint {
  rarity: number;
  nft_id?: number;
  collection_id?: number;
  supply?: string;
}

export default function MintWeight({ pool_id }: MintWeightProps) {
  const { api } = useAppSelector(state => state.substrate);

  const { data, isLoading, isError } = useQuery(
    ['lootTableOf', pool_id],
    async () => {
      if (api) {
        const service: Vec<GafiSupportGameTypesLoot> =
          await api.query.game.lootTableOf(pool_id);

        return Promise.all(
          service.map(async meta => {
            // should return Infinity
            if (meta.maybeNft.isEmpty) {
              return { rarity: meta.weight.toNumber() };
            }

            const getSupply = await api.query.game.supplyOf(
              meta.maybeNft.value.collection.toNumber(),
              meta.maybeNft.value.item.toNumber()
            );

            return {
              nft_id: meta.maybeNft.value.item.toNumber(),
              collection_id: meta.maybeNft.value.collection.toNumber(),
              supply: getSupply.toHuman() as string,
              rarity: meta.weight.toNumber(),
            } as lootTableOfMint;
          })
        );
      }
    },
    {
      enabled: !!api,
      cacheTime: 0,
    }
  );

  const { getPoolOf } = usePoolOf({
    key: pool_id,
    group: [{ pool_id: Number(pool_id) }],
  });

  const { metaNFT } = useMetaNFT({
    key: pool_id,
    group: data
      ?.filter(item => !isUndefined(item.collection_id))
      .map(
        ({ collection_id, nft_id }) =>
          ({ collection_id, nft_id } as keyof useMetaNFTProps['group'])
      ),
  });

  const { metaCollection } = useMetaCollection({
    key: String(pool_id),
    group: data
      ?.filter(item => !isUndefined(item.collection_id))
      .map(
        ({ collection_id }) =>
          ({ collection_id } as keyof useMetaCollectionProps['group'])
      ),
  });

  if (isError || !data?.length) {
    return (
      <CardBox variant="createGames" as={Center} py={4}>
        Not Found
      </CardBox>
    );
  }

  if (isLoading) {
    return (
      <Center py={4}>
        <CircularProgress isIndeterminate color="primary.a.500" />
      </Center>
    );
  }

  return (
    <>
      {data.length ? (
        <CardBox variant="createGames">
          {getPoolOf ? (
            <>
              <Center justifyContent="space-between">
                <Heading fontSize="md" fontWeight="normal" color="shader.a.500">
                  Owned by&nbsp;
                  <Text as="span" fontWeight="medium" color="primary.a.500">
                    {shorten(getPoolOf.owner)}
                  </Text>
                </Heading>

                <Text color="shader.a.500">
                  Finish in&nbsp;
                  <DateBlock
                    end={
                      isNull(getPoolOf?.endBlock?.value.toHuman())
                        ? 'Infinity'
                        : 'Expired'
                    }
                    endBlock={
                      getPoolOf.endBlock?.isSome
                        ? getPoolOf.endBlock.value.toNumber()
                        : -1
                    }
                    sx={{
                      as: 'span',
                      fontWeight: 'medium',
                      color: 'shader.a.900',
                    }}
                  />
                </Text>
              </Center>

              <Heading
                as="h6"
                display="flex"
                fontSize="md"
                fontWeight="normal"
                color="shader.a.500"
              >
                Price&nbsp;
                <GafiAmount
                  amount={formatGAFI(getPoolOf.price)}
                  sx={{
                    sx: {
                      '&, span': {
                        fontWeight: 'medium',
                        color: 'primary.a.500',
                        fontSize: 'md',
                      },
                    },
                  }}
                />
              </Heading>
            </>
          ) : null}

          <SimpleGrid
            mt={6}
            gap={3.5}
            columns={{
              md: 2,
              lg: 3,
            }}
          >
            {React.Children.toArray(
              data.map(item => {
                const rarity = CalculatorOfRarity(
                  item.rarity,
                  data.map(item => item.rarity)
                );

                const currentNFT = metaNFT?.find(
                  meta =>
                    meta?.nft_id === item.nft_id &&
                    meta?.collection_id === item.collection_id
                );

                const currentCollection = metaCollection?.find(
                  meta => meta?.collection_id === item.collection_id
                );

                const isFailed = isUndefined(item.collection_id);
                const isInfinity = isUndefined(item.supply);

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
                            ? cloundinary_link(currentNFT?.image)
                            : null
                        }
                        alt={`nft-${item.nft_id}`}
                      />

                      <RatioPicture
                        src={
                          currentCollection?.image
                            ? cloundinary_link(currentCollection.image)
                            : null
                        }
                        alt={`collection-${item.collection_id}`}
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
                        {isFailed ? 'Failed' : currentCollection?.title || '-'}
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
                          {isFailed
                            ? 'Good luck next time'
                            : currentNFT?.title || '-'}
                        </Text>

                        {!isFailed && (
                          <Text as="span" color="shader.a.900">
                            ID: {item.nft_id}
                          </Text>
                        )}
                      </Center>

                      <Center justifyContent="space-between" gap={4}>
                        {!isInfinity && (
                          <Text fontSize="sm" color="shader.a.900">
                            Amount:&nbsp;
                            <Text as="span" fontWeight="medium">
                              {item.supply || 'Infinity'}
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
          </SimpleGrid>
        </CardBox>
      ) : null}
    </>
  );
}
