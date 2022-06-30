import {
  Avatar,
  HStack,
  Link,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { formatBalance } from '@polkadot/util';
import { t } from 'i18next';
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
  const [isTablet, isMobile, isNormalScreen, isSmallScreen] = useMediaQuery([
    '(min-width: 740px) and (max-width: 1024px)',
    '(max-width: 739px)',
    '(min-width: 1024px) and (max-width: 1456px)',
    '(min-width: 1024px) and (max-width: 1156px)',
  ]);
  return (
    <>
      <Tr cursor="pointer" onClick={onClick}>
        <Td textAlign="center">
          <HStack>
            <Avatar
              mr={{ base: 0, pc: 4 }}
              w={{ base: 10, pc: isSmallScreen ? 10 : 14 }}
              h={{ base: 10, pc: isSmallScreen ? 10 : 14 }}
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
                {shorten(
                  poolOwner || '',
                  isMobile || isTablet || isSmallScreen ? 3 : undefined
                )}
              </Text>
              <Text fontSize="xs">Games</Text>
            </VStack>
          </HStack>
        </Td>

        <Td textAlign="center">
          <Text
            fontWeight={{ base: 'bold', tablet: 'normal' }}
            fontSize={{ base: '2xl', tablet: 'md' }}
            color={textColor}
          >
            {discount / 10000} %
          </Text>
        </Td>
        {isMobile || isNormalScreen ? (
          <Td
            onClick={e => {
              e.stopPropagation();
              onOpenDetail();
            }}
            textAlign="center"
          >
            <Text color="primary">{t('DETAIL')}</Text>
          </Td>
        ) : (
          <>
            <Td textAlign="center">
              <Text fontWeight="normal" fontSize="md" color={textColor}>
                {txLimit}
              </Text>
            </Td>
            <Td textAlign="center" maxWidth="130px">
              <Text fontWeight="normal" fontSize="md" color={textColor}>
                {formatBalance(
                  amount,
                  { withSi: true, forceUnit: '-', withUnit: '' },
                  chainDecimal || 18
                )}
              </Text>
            </Td>
            <Td textAlign="center" fontWeight="normal" fontSize="md">
              {isOwned ? (
                <OwnedTableActions poolId={pool.id} onClick={onEditClick} />
              ) : (
                <TableActions poolId={pool.id} />
              )}
            </Td>
          </>
        )}
      </Tr>
    </>
  );
};

export default SponsoredPoolTableRow;
