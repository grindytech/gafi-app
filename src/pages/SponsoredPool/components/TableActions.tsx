import { Button, Text, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useLeavePool from 'hooks/useLeavePool';
import useLoadSponsoredPool from 'hooks/useLoadSponsoredPool';
import useSponsoredPool from 'hooks/useSponsoredPool';
import { useWhitelistSource } from 'hooks/useWhitelistSource';

interface IProps {
  poolId: string;
  onClickDetails: () => void;
}

const TableActions: React.FC<IProps> = ({ poolId, onClickDetails }) => {
  const { t } = useTranslation();
  const { joinedPoolInfo, isJoinedPool, refetch } = useLoadSponsoredPool();
  const { leavePool, leaveLoadingPool } = useLeavePool(refetch);
  const { joinSponsoredPool, isLoading } = useSponsoredPool(refetch);
  const { response } = useWhitelistSource(poolId);

  const breakpointsTablet = useBreakpointValue({
    sm: false,
    md: true,
  });

  const button = (type: string) => {
    if (type === 'joined' && breakpointsTablet) {
      return (
        <Button
          size="sm"
          sx={{
            px: 8,
            display: 'inline-flex',
          }}
          variant="outline"
          onClick={e => {
            e.stopPropagation();
            joinSponsoredPool(poolId);
          }}
          disabled={isJoinedPool || isLoading}
          isLoading={isLoading}
        >
          {!response ? t('JOIN') : t('APPLY_WHITELIST')}
        </Button>
      );
    }
    if (type === 'leave' && breakpointsTablet) {
      return (
        <Button
          size="sm"
          sx={{
            px: 8,
            display: 'inline-flex',
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
        onClick={() => onClickDetails()}
        display={{
          md: 'none',
        }}
        color="primary"
      >
        {t('DETAIL')}
      </Text>

      {isJoinedPool
        ? React.Children.toArray(
            joinedPoolInfo?.map(pool =>
              pool.ticketType.isSponsored &&
              pool.ticketType.asSponsored.toHuman() === poolId
                ? button('leave')
                : button('joined')
            )
          )
        : button('joined')}
    </>
  );
};

export default TableActions;
