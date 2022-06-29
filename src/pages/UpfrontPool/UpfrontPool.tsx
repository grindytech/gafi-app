import { SimpleGrid } from '@chakra-ui/react';
import { IPool } from 'gafi-dashboard/hooks/usePool';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Pool from './components/Pool';

import Banner from 'components/Banner';
import useLoadPoolInfo from 'hooks/useLoadUpfrontPool';

export interface TicketType {
  upfront?: string;
  staking?: string;
}

const JoinPool = () => {
  const { t } = useTranslation();
  const { upfrontPools } = useLoadPoolInfo();
  return (
    <>
      <Banner
        title={t('POOL.UPFRONT_POOL')}
        subTitle={t('POOL_DESCRIPTION.UPFRONT_POOL')}
        bannerBg="/assets/layout/upfront-banner-bg.png"
        btnLink="https://wiki.gafi.network/learn/upfront-pool"
      />
      <SimpleGrid mt="4" minChildWidth="308px" spacing="1em" minH="full">
        {React.Children.toArray(
          upfrontPools.map((pool: IPool) => <Pool pool={pool} />)
        )}
      </SimpleGrid>
    </>
  );
};

export default JoinPool;
