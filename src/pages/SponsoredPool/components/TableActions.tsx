import { Button } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useLoadSponsoredPool from 'hooks/useLoadSponsoredPool';
import usePool from 'hooks/usePool';

interface IProps {
  poolId: string;
}

const TableActions: React.FC<IProps> = ({ poolId }) => {
  const { t } = useTranslation();
  const { joinedPoolInfo, isJoinedPool, refetch } = useLoadSponsoredPool();
  const { joinSponsoredPool, isSponsoredPoolLoading, leavePool } =
    usePool(refetch);

  return (
    <>
      {joinedPoolInfo?.ticketType.isCustom &&
      joinedPoolInfo?.ticketType.asCustom.asSponsored.toHuman() === poolId ? (
        <Button
          size="sm"
          sx={{
            px: 8,
          }}
          borderRadius="4xl"
          variant="primary"
          onClick={e => {
            e.stopPropagation();
            leavePool();
          }}
          isLoading={isSponsoredPoolLoading}
        >
          {t('LEAVE')}
        </Button>
      ) : (
        <Button
          size="sm"
          sx={{
            px: 8,
          }}
          variant="outline"
          onClick={e => {
            e.stopPropagation();
            joinSponsoredPool(poolId);
          }}
          disabled={isJoinedPool}
          isLoading={isSponsoredPoolLoading}
        >
          {t('JOIN')}
        </Button>
      )}
    </>
  );
};

export default TableActions;
