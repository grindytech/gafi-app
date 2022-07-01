import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useBreakPoint from 'hooks/useBreakPoint';
import useLoadSponsoredPool from 'hooks/useLoadSponsoredPool';
import useSponsoredPool from 'hooks/useSponsoredPool';

interface IProps {
  poolId: string;
  onOpenDetail: () => void;
}

const TableActions: React.FC<IProps> = ({ poolId, onOpenDetail }) => {
  const { t } = useTranslation();
  const { joinedPoolInfo, isJoinedPool, refetch } = useLoadSponsoredPool();
  const { joinSponsoredPool, isLoading, leavePool } = useSponsoredPool(refetch);
  const { isMobile, isSmallScreen } = useBreakPoint();
  const isZoomOut = isMobile || isSmallScreen;
  return (
    <>
      {isZoomOut ? (
        <Text color="primary">{t('DETAIL')}</Text>
      ) : (
        <>
          {joinedPoolInfo?.ticketType.isCustom &&
          joinedPoolInfo?.ticketType.asCustom.asSponsored.toHuman() ===
            poolId ? (
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
              isLoading={isLoading}
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
              isLoading={isLoading}
            >
              {t('JOIN')}
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default TableActions;
