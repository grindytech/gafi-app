import { Box, BoxProps, Center, Flex, Icon, Text } from '@chakra-ui/react';
import { isUndefined } from '@polkadot/util';
import { cloundinary_link } from 'axios/cloudinary_axios';
import RatioPicture from 'components/RatioPicture';

import BlockIcon from 'public/assets/line/block.svg';
import EmptyIcon from 'public/assets/fill/empty.svg';
import { ColorOfRarity, convertHex } from 'utils';

interface PoolsModalCardProps {
  sx?: BoxProps;
  collection: {
    name: string;
  };
  nft: {
    name: string;
    id: number;
    image: string | null;
  };
  amount: number | string;
  rarity: string;
}

export default ({
  amount,
  collection,
  nft,
  rarity,
  sx,
}: PoolsModalCardProps) => {
  const isFailed = isUndefined(amount);
  const isInfinity = amount === 'infinity';

  return (
    <Box
      overflow="hidden"
      position="relative"
      borderRadius="xl"
      border="0.0625rem solid"
      borderColor="shader.a.800"
      bg="shader.a.900"
      fontSize="sm"
      fontWeight="medium"
      color="white"
      {...sx}
    >
      {isFailed ? (
        <>
          <Center borderRadius="xl" bg="shader.a.800">
            <Icon py={4} as={EmptyIcon} width="auto" height="7.5rem" />
          </Center>

          <Box px={4} py={3}>
            <Text fontSize="sm" color="second.red">
              Failed State
            </Text>

            <Text fontSize="xs" fontWeight="normal">
              Good luck next time!
            </Text>

            <Text mt={1}>
              Rarity:&nbsp;
              <Text as="span">{rarity}%</Text>
            </Text>
          </Box>
        </>
      ) : (
        <>
          <RatioPicture
            src={nft?.image ? cloundinary_link(nft.image) : null}
            sx={{ width: 'full' }}
          />

          <Box px={4} py={3}>
            <Text fontSize="xs" color="shader.a.400" fontWeight="normal">
              {collection.name}
            </Text>

            <Flex wordBreak="break-word" gap={4} justifyContent="space-between">
              <Text>{nft.name}</Text>

              <Text color="shader.a.500">
                ID:&nbsp;
                <Text as="span" color="white">
                  {nft.id}
                </Text>
              </Text>
            </Flex>

            <Text mt={1}>
              Rarity:&nbsp;
              <Text as="span" color={ColorOfRarity(rarity)}>
                {rarity}%
              </Text>
            </Text>
          </Box>

          <Center
            position="absolute"
            inset="0 auto auto 0"
            borderRadius="md"
            bg={convertHex('#000000', 0.3)}
            backdropFilter="blur(2.03125rem)"
            gap={1}
            margin={2}
            py={1}
            px={1.5}
          >
            <Icon as={BlockIcon} width={4} height={4} />

            <Text color="white" fontSize="sm" fontWeight="medium">
              {isInfinity ? 'Infinity' : `x${amount}`}
            </Text>
          </Center>
        </>
      )}
    </Box>
  );
};
