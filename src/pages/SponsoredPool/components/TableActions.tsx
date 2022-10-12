import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useLeavePool from 'hooks/useLeavePool';
import useLoadSponsoredPool from 'hooks/useLoadSponsoredPool';
import useSponsoredPool from 'hooks/useSponsoredPool';

interface IProps {
  poolId: string;
}

const TableActions: React.FC<IProps> = ({ poolId }) => {
  const { t } = useTranslation();
  const { joinedPoolInfo, isJoinedPool, refetch } = useLoadSponsoredPool();
  const { leavePool, leaveLoadingPool } = useLeavePool(refetch);
  const { joinSponsoredPool, isLoading } = useSponsoredPool(refetch);

  const button = (type: string) => {
    if (type === 'joined') {
      return (
        <Button
          size="sm"
          display={{
            sm: 'none',
            '2xl': 'block',
          }}
          sx={{
            px: 8,
          }}
          variant="outline"
          onClick={e => {
            e.stopPropagation();
            joinSponsoredPool(poolId);
          }}
          disabled={isJoinedPool || isLoading}
          isLoading={isLoading}
        >
          {t('JOIN')}
        </Button>
      );
    }
    if (type === 'leave') {
      return (
        <Button
          size="sm"
          sx={{
            px: 8,
          }}
          display={{
            sm: 'none',
            '2xl': 'block',
          }}
          borderRadius="4xl"
          variant="primary"
          onClick={e => {
            e.stopPropagation();
            leavePool(poolId);
          }}
          isLoading={!!leaveLoadingPool}
          disabled={!!leaveLoadingPool}
        >
          {t('LEAVE')}
        </Button>
      );
    }
  };

  return (
    <>
      <Text
        display={{
          sm: 'block',
          '2xl': 'none',
        }}
        color="primary"
      >
        {t('DETAIL')}
      </Text>
      {isJoinedPool
        ? joinedPoolInfo?.map(pool =>
            pool.ticketType.isSponsored &&
            pool.ticketType.asSponsored.toHuman() === poolId
              ? React.Children.toArray(button('leave'))
              : React.Children.toArray(button('joined'))
          )
        : button('joined')}
    </>
  );
};

export default TableActions;
