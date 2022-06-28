import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Pool from '../UpfrontPool/components/Pool';

import Banner from 'components/Banner';
import useStakingPool from 'hooks/useStakingPool';
import { IPool } from 'hooks/useUpfrontPool';

const StakingPool = () => {
  const { t } = useTranslation();
  const { pools } = useStakingPool();

  return (
    <>
      <Banner
        title={t('POOL.STACKING_POOL')}
        subTitle={t('POOL_DESCRIPTION.STACKING_POOL')}
        bannerBg="/assets/layout/stacking-banner-bg.png"
        btnLink="https://wiki.gafi.network/learn/staking-pool"
      />
      <SimpleGrid mt="4" minChildWidth="308px" spacing="1em" minH="full">
        {React.Children.toArray(
          pools.map((pool: IPool) => <Pool pool={pool} />)
        )}
      </SimpleGrid>
    </>
  );
};

export default StakingPool;
