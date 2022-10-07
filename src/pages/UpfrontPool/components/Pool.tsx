import { Box, Button, CSSObject, Heading, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Card from 'components/card/Card';
import { useSubstrateState } from 'contexts/substrateContext';
import { IPool } from 'hooks/useSponsoredPool';

interface IProps {
  pool: IPool;
  sx?: CSSObject;
}

const Pool: React.FC<IProps> = ({ pool, sx }) => {
  const { formatUnits } = ethers.utils;

  const { chainDecimal } = useSubstrateState();

  const { t } = useTranslation();

  return pool ? (
    <Card sx={{ ...sx, p: 0, overflow: 'hidden' }}>
      <Box
        sx={{
          ...bannerStyled,
          background: `url(${pool.banner}) no-repeat center`,
          backgroundSize: 'cover',
          height: { sm: 24, md: 210, lg: 24, xl: 210 },
        }}
      >
        <Heading> {pool.poolType}</Heading>
      </Box>

      <Box sx={contentStyled}>
        <Heading as="h2" size="lg" pt={{ base: 4, md: 8 }} mb={4}>
          {t('DISCOUNT_FEE', {
            discountPercent: pool.discount,
          })}
        </Heading>

        <Box mb={{ base: 10, md: 16 }}>
          <Text color="greyText">
            {t('TRANSACTIONS_RATE', {
              transactionAmount: pool.rate.txLimit,
              minute: pool.rate.minute,
            })}
          </Text>

          <Text color="greyText">
            {t('POOL_FEE', {
              poolFee: formatUnits(
                pool.fee.gaki.replaceAll(',', ''),
                chainDecimal
              ), // reason replaceAll: value from 15,00 to 1500 because error BigNumber string
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
            data-test={`btn-${pool.poolType}`}
            isDisabled={pool.isDisabled}
          >
            {t('JOIN')}
          </Button>
        )}
      </Box>
    </Card>
  ) : null;
};

export default Pool;

const bannerStyled = {
  width: '100%',
  fontWeight: { base: 'bold' },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: { base: '2xl', md: '4xl' },
  textTransform: 'uppercase',
};

const contentStyled = {
  p: { base: 6, md: 8 },
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};
