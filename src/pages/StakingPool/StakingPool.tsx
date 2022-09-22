import { Box, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Pool from '../UpfrontPool/components/Pool';

import Banner from 'components/Banner';
import useLoadStakingPool from 'hooks/useLoadStakingPool';
import { IPool } from 'hooks/useSponsoredPool';

const StakingPool = () => {
  const { t } = useTranslation();
  const { stakingPools } = useLoadStakingPool();

  return (
    <>
      <Banner
        title={t('POOL.STAKING_POOL')}
        subTitle={t('POOL_DESCRIPTION.STAKING_POOL')}
        bannerBg="/assets/layout/staking-banner-bg.svg"
        btnLink="https://wiki.gafi.network/learn/staking-pool"
      />
      <Box p={{ sm: 4, md: 0 }}>
        <SimpleGrid minChildWidth="288px" spacing="1em" minH="full">
          {React.Children.toArray(
            stakingPools.map((pool: IPool) => <Pool pool={pool} />)
          )}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default StakingPool;
