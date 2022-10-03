import React from 'react';

import SponsoredPoolTableRow from './SponsoredPoolTableRow';

import EmptyRow from 'components/EmptyRow';
import { SponsoredPool } from 'graphQL/generates';

interface IProps {
  sponsoredPools: SponsoredPool[];
  setSelectedPoolDetail: (pool: SponsoredPool) => void;
  setSelectedPool: (pool: SponsoredPool) => void;
  setSelectedEditPool: (pool: SponsoredPool) => void;
  captionAmounts: number;
}

const SponsoredPoolData = ({
  sponsoredPools,
  setSelectedPoolDetail,
  setSelectedPool,
  setSelectedEditPool,
  captionAmounts,
}: IProps) => (
  <>
    {sponsoredPools.length ? (
      React.Children.toArray(
        sponsoredPools.map(pool => (
          <SponsoredPoolTableRow
            onOpenDetail={() => setSelectedPoolDetail(pool)}
            pool={pool}
            onClick={() => setSelectedPool(pool)}
            onEditClick={() => setSelectedEditPool(pool)}
          />
        ))
      )
    ) : (
      <EmptyRow columnAmount={captionAmounts} />
    )}
  </>
);

export default SponsoredPoolData;
