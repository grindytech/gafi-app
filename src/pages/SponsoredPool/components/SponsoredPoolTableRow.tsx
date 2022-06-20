import {
  Avatar,
  HStack,
  Td,
  Text,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { formatBalance } from '@polkadot/util';
import { SponsoredPool } from 'gafi-dashboard/graphQL/generates';
import React, { useState } from 'react';
import { useQueryParam } from 'use-query-params';

import ModalEditPool from './ModalEditPool';
import OwnedTableActions from './OwnedTableActions';
import TableActions from './TableActions';

import { shorten } from 'components/utils';
import { useSubstrateState } from 'substrate-lib';

interface IProps {
  pool: SponsoredPool;
  onClick?: () => void;
}

const SponsoredPoolTableRow: React.FC<IProps> = ({ pool, onClick }) => {
  const { poolOwner, discount, txLimit, amount } = pool;
  const textColor = useColorModeValue('gray.700', 'white');
  const [isOpenEditPoolModal, setIsOpenEditPoolModal] = useState(false);
  const { chainDecimal } = useSubstrateState();
  const [type, _] = useQueryParam('type');
  const isOwned = type === 'owned';

  return (
    <>
      <Tr cursor="pointer" onClick={onClick}>
        <Td textAlign="center" minWidth={{ sm: '250px' }}>
          <HStack>
            <Avatar
              mr={4}
              w={14}
              h={14}
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
                {shorten(poolOwner || '')}
              </Text>
              <Text fontSize="xs">Games</Text>
            </VStack>
          </HStack>
        </Td>

        <Td textAlign="center">
          <Text fontWeight="normal" fontSize="md" color={textColor}>
            {discount / 10000} %
          </Text>
        </Td>
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
            <OwnedTableActions
              poolId={pool.id}
              onClick={() => {
                setIsOpenEditPoolModal(true);
              }}
            />
          ) : (
            <TableActions poolId={pool.id} />
          )}
        </Td>
      </Tr>
      <ModalEditPool
        pool={pool}
        isOpen={isOpenEditPoolModal}
        onClose={() => {
          setIsOpenEditPoolModal(false);
        }}
      />
    </>
  );
};

export default SponsoredPoolTableRow;
