import { SimpleGrid } from '@chakra-ui/react';
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
        bannerBg="/assets/layout/staking-banner-bg.png"
        btnLink="https://wiki.gafi.network/learn/staking-pool"
      />
      <SimpleGrid mt="4" minChildWidth="308px" spacing="1em" minH="full">
        {React.Children.toArray(
          stakingPools.map((pool: IPool) => <Pool pool={pool} />)
        )}
      </SimpleGrid>
    </>
  );
};

export default StakingPool;
