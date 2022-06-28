import { Box, Heading, Text, Button, CSSObject } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';
import { useSubstrateState } from 'contexts/substrateContext';
import { IPool } from 'hooks/useUpfrontPool';

interface IProps {
  pool: IPool;
  sx?: CSSObject;
}

const Pool: React.FC<IProps> = ({ pool, sx }) => {
  const { formatUnits } = ethers.utils;
  const { chainDecimal } = useSubstrateState();
  const { t } = useTranslation();
  return (
    <Card sx={{ ...sx, p: 0, overflow: 'hidden' }}>
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
        <Heading as="h2" size="lg" pt={{ base: 4, tablet: 8 }} mb={4}>
          {t('DISCOUNT_FEE', {
            discountPercent: pool.discount / 10000,
          })}
        </Heading>
        <Box mb={{ base: 10, tablet: 16 }}>
          <Text color="greyText">
            {t('TRANSACTIONS_RATE', {
              transactionAmount: pool.rate.txLimit,
              minute: pool.rate.minute,
            })}
          </Text>
          <Text color="greyText">
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
            isDisabled={pool.isDisabled}
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
  height: { base: 24, tablet: 210 },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: { base: '2xl', tablet: '4xl' },
  fontWeight: { base: 'bold', tablet: 'medium' },
  textTransform: 'uppercase',
};

const contentStyled = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  p: { base: 6, tablet: 8 },
};
