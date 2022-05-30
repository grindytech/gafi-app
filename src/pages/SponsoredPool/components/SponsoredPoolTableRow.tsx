import { Td, Text, Tr, useColorModeValue } from '@chakra-ui/react';
import { formatBalance } from '@polkadot/util';
import { shorten } from 'components/utils';
import { SponsoredPool } from 'gafi-dashboard/graphQL/generates';
import React, { useState } from 'react';
import { useSubstrateState } from 'substrate-lib';
import { useQueryParam } from 'use-query-params';
import TableActions from './TableActions';
import OwnedTableActions from './OwnedTableActions';
import ModalEditPool from './ModalEditPool';

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
        <Td minWidth={{ sm: '250px' }} pl="0px">
          <Text fontSize="md" color={textColor} minWidth="100%">
            {shorten(poolOwner || '')}
          </Text>
        </Td>

        <Td>
          <Text fontSize="md" color={textColor}>
            {discount} %
          </Text>
        </Td>
        <Td>
          <Text fontSize="md" color={textColor}>
            {txLimit}
          </Text>
        </Td>
        <Td maxWidth="130px">
          <Text fontSize="md" color={textColor} pb=".5rem">
            {formatBalance(
              amount,
              { withSi: true, forceUnit: '-', withUnit: 'GAKI' },
              chainDecimal || 18
            )}
          </Text>
        </Td>
        <Td textAlign="right">
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
