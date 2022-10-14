import {
  Avatar,
  HStack,
  Td,
  Text,
  Tr,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { formatBalance, hexToString } from '@polkadot/util';
import React from 'react';
import { useQueryParam } from 'use-query-params';

import OwnedTableActions from './OwnedTableActions';
import TableActions from './TableActions';

import { useSubstrateState } from 'contexts/substrateContext';
import { SponsoredPool } from 'graphQL/generates';
import { shorten } from 'utils';

interface IProps {
  pool: SponsoredPool;
  onClick?: () => void;
  onEditClick: () => void;
  onOpenDetail: () => void;
}

const SponsoredPoolTableRow: React.FC<IProps> = ({
  pool,
  onClick,
  onEditClick,
  onOpenDetail,
}) => {
  const { poolOwner, discount, txLimit, amount } = pool;
  const textColor = useColorModeValue('gray.700', 'white');
  const { chainDecimal } = useSubstrateState();
  const [type, _] = useQueryParam('type');
  const isOwned = type === 'owned';
  const display = useBreakpointValue({
    sm: 'none',
    md: undefined,
    lg: undefined,
    xl: undefined,
    '2xl': undefined,
  });

  const amountCharacter = useBreakpointValue({ sm: 3, md: 6, lg: 3, xl: 6 });

  const currentDiscount = 10000;

  return (
    <>
      <Tr cursor="pointer" onClick={onClick}>
        <Td textAlign="center">
          <HStack>
            <Avatar
              mr={{ base: 0, lg: 4 }}
              w={{ base: 10, lg: 14 }}
              h={{ base: 10, lg: 14 }}
              name="Segun Adebayo"
              src="/assets/layout/contract-img-1.png"
            />
            <VStack ml={0} alignItems="flex-start">
              <Text
                fontWeight="bold"
                fontSize="md"
                color={textColor}
                minWidth="100%"
              >
                {shorten(poolOwner || '', amountCharacter)}
              </Text>
              <Text fontSize="xs">
                {pool.poolName ? hexToString(pool.poolName) : 'Games'}
              </Text>
            </VStack>
          </HStack>
        </Td>

        <Td textAlign="center">
          <Text
            fontWeight={{ base: 'bold', md: 'normal' }}
            fontSize={{ base: '2xl', md: 'md' }}
            color={textColor}
          >
            {discount / currentDiscount} %
          </Text>
        </Td>

        <Td sx={{ display }} textAlign="center">
          <Text fontWeight="normal" fontSize="md" color={textColor}>
            {txLimit}
          </Text>
        </Td>
        <Td sx={{ display }} textAlign="center" maxWidth="130px">
          <Text fontWeight="normal" fontSize="md" color={textColor}>
            {formatBalance(
              amount,
              { withSi: true, forceUnit: '-', withUnit: '' },
              chainDecimal
            )}
          </Text>
        </Td>
        <Td
          onClick={e => {
            e.stopPropagation();
            onOpenDetail();
          }}
          textAlign="center"
          fontWeight="normal"
          fontSize="md"
        >
          {isOwned ? (
            <OwnedTableActions poolId={pool.id} onClick={onEditClick} />
          ) : (
            <TableActions poolId={pool.id} />
          )}
        </Td>
      </Tr>
    </>
  );
};

export default SponsoredPoolTableRow;
