import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useWithdraw from 'hooks/useWithdraw';

interface IProps {
  poolId: string;
  onClick: () => void;
}

const OwnedTableActions: React.FC<IProps> = ({ poolId, onClick }) => {
  const { t } = useTranslation();
  const { withdrawPoolBalance, isLoading } = useWithdraw();
  return (
    <Box sx={myPoolActions}>
      <Button
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
        size="sm"
        variant="primary"
      >
        {t('EDIT')}
      </Button>
      <Button
        onClick={e => {
          e.stopPropagation();
          withdrawPoolBalance(poolId);
        }}
        ml={3}
        size="sm"
        variant="outline"
        isLoading={isLoading}
      >
        {t('WITHDRAW')}
      </Button>
    </Box>
  );
};

export default OwnedTableActions;

const myPoolActions = {
  display: 'flex',
  flexWrap: 'no-wrap',
};
