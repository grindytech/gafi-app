import { Box, Heading, Text, Button, CSSObject } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';
import { useSubstrateState } from 'substrate-lib';

export interface IPool {
  poolType: string;
  discount: number;
  rate: {
    txLimit: number;
    minute: number;
  };
  banner: string;
  fee: {
    gaki: string;
    minute: number;
  };
  onJoin: () => void;
  onLeave: () => void;
  isLoading: boolean;
  isJoined: boolean;
}

interface IProps {
  pool: IPool;
  sx?: CSSObject;
}

const Pool: React.FC<IProps> = ({ pool, sx }) => {
  const { formatUnits } = ethers.utils;
  const { chainDecimal } = useSubstrateState();
  const { t } = useTranslation();
  return (
    <Card sx={{ ...sx, p: 0 }}>
      <Box
        sx={{
          ...bannerStyled,
          background: `url(${pool.banner}) no-repeat center`,
          backgroundSize: 'cover',
        }}
      >
        {pool.poolType}
      </Box>
      <Box sx={contentStyled}>
        <Heading as="h2" size="lg" pt={8} mb={4}>
          {t('DISCOUNT_FEE', {
            discountPercent: pool.discount,
          })}
        </Heading>
        <Box mb={16}>
          <Text>
            {t('TRANSACTIONS_RATE', {
              transactionAmount: pool.rate.txLimit,
              minute: pool.rate.minute,
            })}
          </Text>
          <Text>
            {t('POOL_FEE', {
              poolFee: formatUnits(pool.fee.gaki, chainDecimal),
              minute: pool.fee.minute,
            })}
          </Text>
        </Box>
        {pool.isJoined ? (
          <Button
            onClick={pool.onLeave}
            isLoading={pool.isLoading}
            variant="secondary"
          >
            {t('LEAVE')}
          </Button>
        ) : (
          <Button
            onClick={pool.onJoin}
            isLoading={pool.isLoading}
            variant="primary"
          >
            {t('JOIN')}
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default Pool;

const bannerStyled = {
  width: '100%',
  height: 210,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '4xl',
  fontWeight: 'medium',
  textTransform: 'uppercase',
};

const contentStyled = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: 8,
};
