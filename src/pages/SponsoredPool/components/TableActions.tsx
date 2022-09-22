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
  const { leavePool } = useLeavePool(refetch);
  const { joinSponsoredPool, isLoading } = useSponsoredPool(refetch);

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

      {(joinedPoolInfo?.isSponsored &&
        joinedPoolInfo?.asSponsored.toHuman()) === poolId ? (
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
            leavePool(isLoading.toString());
          }}
          isLoading={isLoading}
        >
          {t('LEAVE')}
        </Button>
      ) : (
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
          disabled={isJoinedPool}
          isLoading={isLoading}
        >
          {t('JOIN')}
        </Button>
      )}
    </>
  );
};

export default TableActions;
