import {
  Box,
  Center,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import { TabsPoolDataProps } from '.';
import RatioPicture from 'components/RatioPicture';
import AvatarPopover from 'components/Avatar/AvatarPopover';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import { CalculatorOfRarity, ColorOfRarity, convertHex } from 'utils/utils';
import DateBlock from 'components/DateBlock';

import { colors } from 'theme/theme';
import useMetaNFT from 'hooks/useMetaNFT';
import React from 'react';

import { cloundinary_link } from 'axios/cloudinary_axios';
import EmptyIcon from 'public/assets/fill/empty.svg';
import { isNull } from '@polkadot/util';
import useMetaPool from 'hooks/useMetaPool';

interface TabsNFTPanelProps {
  meta?: TabsPoolDataProps[] | undefined;
}

export default ({ meta }: TabsNFTPanelProps) => {
  return <>{meta?.length ? <TabsPoolPanelService meta={meta} /> : null}</>;
};

function TabsPoolPanelService({ meta }: { meta: TabsPoolDataProps[] }) {
  const loot_table = meta
    .map(meta => meta.lootOfTable.map(meta => meta))
    .flat();

  const { metaNFT } = useMetaNFT({
    key: 'creator_tab_pool',
    filter: 'collection_id',
    arg: loot_table
      .filter(meta => meta.maybeNft.isSome)
      .map(({ maybeNft }) => ({
        collection_id: maybeNft.value.collection.toNumber(),
        nft_id: maybeNft.value.item.toNumber(),
      })),
  });

  const { MetaPool } = useMetaPool({
    key: `creator_tab_pool`,
    filter: 'pool_id',
    arg: meta.map(({ pool_id }) => pool_id),
  });

  return (
    <>
      {meta.map(
        ({ admin, owner, endBlock, pool_id, lootOfTable, supplyOf }) => {
          const currentMetaNFT = metaNFT?.find(({ collection_id, nft_id }) =>
            lootOfTable.some(({ maybeNft }) => {
              if (maybeNft.isSome) {
                return (
                  maybeNft.value.collection.toNumber() === collection_id &&
                  maybeNft.value.item.toNumber() === nft_id
                );
              }
            })
          );

          const currentMetaPool = MetaPool?.find(
            meta => meta.pool_id === pool_id
          );

          return (
            <Box
              key={pool_id}
              fontWeight="medium"
              bg="shader.a.900"
              borderRadius="xl"
            >
              <Box position="relative">
                <RatioPicture
                  src={
                    currentMetaNFT?.avatar
                      ? cloundinary_link(currentMetaNFT.avatar)
                      : null
                  }
                />

                <Flex position="absolute" bottom={0} margin={3}>
                  <AvatarPopover type="Owner" address={owner} name="-">
                    <AvatarJazzicon
                      address={owner}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </AvatarPopover>

                  <AvatarPopover type="Admin" address={admin} name="-">
                    <AvatarJazzicon
                      address={admin}
                      sx={{ width: '100%', height: '100%' }}
                    />
                  </AvatarPopover>
                </Flex>
              </Box>

              <Stack padding={4}>
                <Flex gap={4} justifyContent="space-between">
                  <Text as="strong" color="white" wordBreak="break-word">
                    {currentMetaPool?.title || 'unknown'}
                  </Text>

                  <Text color="shader.a.500" fontSize="sm">
                    ID:&nbsp;
                    <Text as="span" color="white">
                      {pool_id}
                    </Text>
                  </Text>
                </Flex>

                <Center justifyContent="space-between">
                  <Text fontSize="sm" color="shader.a.400">
                    Supply
                  </Text>

                  <Menu placement="top-start">
                    <MenuButton
                      fontSize="xs"
                      bg={
                        lootOfTable.length
                          ? convertHex(colors.primary.a[200], 0.15)
                          : 'shader.a.800'
                      }
                      color={
                        lootOfTable.length ? 'primary.a.200' : 'shader.a.400'
                      }
                      borderRadius="2xl"
                      px={2}
                      py={1}
                    >
                      + {lootOfTable.length} items
                    </MenuButton>

                    {lootOfTable.length ? (
                      <MenuList
                        minWidth="auto"
                        padding={4}
                        borderRadius="lg"
                        borderColor="shader.a.800"
                        bg="shader.a.900"
                        fontWeight="medium"
                        color="shader.a.500"
                      >
                        <Text color="primary.a.300" fontSize="sm" mb={4}>
                          Pool detail
                        </Text>

                        {React.Children.toArray(
                          lootOfTable.map(({ maybeNft, weight }, index) => {
                            const getWeight = CalculatorOfRarity(
                              weight.toNumber(),
                              lootOfTable.map(meta => meta.weight.toNumber())
                            );

                            const currentMetaNFTChild = metaNFT?.find(
                              ({ collection_id, nft_id }) =>
                                collection_id ===
                                  maybeNft.value.collection?.toNumber() &&
                                nft_id === maybeNft.value.item?.toNumber()
                            );

                            const isInfinity = isNull(supplyOf[index]);

                            return (
                              <MenuItem
                                border="0.0625rem solid"
                                padding={2}
                                pr={4}
                                borderColor="shader.a.800"
                                bg={convertHex(colors.shader.a[800], 0.35)}
                                gap={4}
                                borderRadius="xl"
                                width={{
                                  '2sm': 'md',
                                }}
                                _notFirst={{ mt: 3 }}
                                sx={{
                                  '.nft-avatar': {
                                    width: 16,
                                    height: 16,
                                    borderRadius: 'xl',
                                    overflow: 'hidden',
                                  },
                                }}
                              >
                                {maybeNft.isSome ? (
                                  <>
                                    <Box className="nft-avatar">
                                      <RatioPicture
                                        src={
                                          currentMetaNFTChild?.avatar
                                            ? cloundinary_link(
                                                currentMetaNFTChild.avatar
                                              )
                                            : null
                                        }
                                        sx={{ width: 'full', height: 'full' }}
                                      />
                                    </Box>

                                    <Box flex={1} wordBreak="break-word">
                                      <Text color="white">
                                        {currentMetaNFTChild?.title ||
                                          'unknown'}
                                        &nbsp;
                                        <Text
                                          as="span"
                                          fontWeight="normal"
                                          color="shader.a.300"
                                          fontSize="sm"
                                        >
                                          ID: {maybeNft.value.item.toNumber()}
                                        </Text>
                                      </Text>

                                      <Center
                                        justifyContent="space-between"
                                        mt={1}
                                        gap={4}
                                      >
                                        <Text fontWeight="normal" fontSize="sm">
                                          Rarity:&nbsp;
                                          <Text
                                            as="span"
                                            fontWeight="medium"
                                            color={ColorOfRarity(getWeight)}
                                          >
                                            {getWeight}%
                                          </Text>
                                        </Text>

                                        <Text color="white" fontWeight="medium">
                                          {isInfinity
                                            ? '∞ Infinity'
                                            : supplyOf[index]}
                                        </Text>
                                      </Center>

                                      {isInfinity ? null : (
                                        <Progress
                                          mt={4}
                                          borderRadius="lg"
                                          value={80}
                                          width="full"
                                          height="8px"
                                          bg="shader.a.700"
                                          sx={{
                                            '> div': { bg: 'primary.a.300' },
                                          }}
                                        />
                                      )}
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <Box
                                      className="nft-avatar"
                                      bg="shader.a.800"
                                      padding={2}
                                    >
                                      <Icon
                                        as={EmptyIcon}
                                        width="full"
                                        height="full"
                                      />
                                    </Box>

                                    <Box flex={1} wordBreak="break-word">
                                      <Text color="second.red">
                                        Failed state
                                      </Text>

                                      <Text
                                        fontSize="sm"
                                        color="shader.a.300"
                                        fontWeight="normal"
                                      >
                                        Rarity:&nbsp;
                                        <Text
                                          as="span"
                                          fontWeight="medium"
                                          color={ColorOfRarity(getWeight)}
                                        >
                                          {getWeight}%
                                        </Text>
                                      </Text>
                                    </Box>
                                  </>
                                )}
                              </MenuItem>
                            );
                          })
                        )}
                      </MenuList>
                    ) : null}
                  </Menu>
                </Center>

                <Text fontWeight="normal" fontSize="xs" color="shader.a.400">
                  End in:&nbsp;
                  <DateBlock
                    end={endBlock.isEmpty ? 'Infinity' : 'Expired'}
                    endBlock={endBlock.isSome ? endBlock.value.toNumber() : -1}
                    sx={{
                      as: 'span',
                      color: 'white',
                      fontWeight: 'medium',
                    }}
                  />
                </Text>
              </Stack>
            </Box>
          );
        }
      )}
    </>
  );
}
