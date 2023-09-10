import { UseFormSetValue } from 'react-hook-form';
import { PoolsFieldProps } from '..';
import useMetaCollection from 'hooks/useMetaCollection';
import useMetaNFT from 'hooks/useMetaNFT';
import React, { useState } from 'react';
import PoolsConfigModal from '../PoolsConfig/PoolsConfigModal';
import PoolsConfigModalOuter from '../PoolsConfig/PoolsConfigModal/PoolsConfigModalOuter';
import PoolsConfigModalCard from '../PoolsConfig/PoolsConfigModal/PoolsConfigModalCard';

interface PoolsStableProps {
  onClose: () => void;
  supplyOf: { collection_id: number; nft_id: number }[];
  setValue: UseFormSetValue<PoolsFieldProps>;
  product: PoolsFieldProps['add_item_supply'];
}

export default ({ supplyOf, onClose, setValue, product }: PoolsStableProps) => {
  const { MetaCollection } = useMetaCollection({
    key: `creator_pool_stable`,
    filter: 'collection_id',
    arg: supplyOf.map(({ collection_id }) => collection_id),
  });

  const { metaNFT } = useMetaNFT({
    key: `creator_pool_stable`,
    filter: 'collection_id',
    arg: supplyOf.map(({ nft_id, collection_id }) => ({
      nft_id,
      collection_id,
    })),
  });

  const groupItemOfBalance = () => {
    const result = supplyOf.reduce(function (r, a) {
      r[a.collection_id] = r[a.collection_id] || [];
      r[a.collection_id].push(a);
      return r;
    }, Object.create(null));

    return result as (typeof supplyOf)[];
  };

  const [search, setSearch] = useState('');

  return (
    <PoolsConfigModal
      onClose={onClose}
      setSearch={setSearch}
      setValue={setValue}
      product={product}
      add_key="add_item_stable"
    >
      {Object.entries(groupItemOfBalance()).map(([key, meta]) => {
        const currentMetaCollection = MetaCollection?.find(
          data => data?.collection_id === Number(key)
        );

        const collectionID = key.toLowerCase();
        const collectionName = currentMetaCollection?.title.toLowerCase();

        const JSXElement = (
          <PoolsConfigModalOuter
            key={key}
            id={key}
            name={currentMetaCollection?.title || 'unknown'}
            image={currentMetaCollection?.avatar}
            length={meta.length}
          >
            {React.Children.toArray(
              meta.map(({ collection_id, nft_id }) => {
                const currentMetaNFT = metaNFT?.find(
                  data =>
                    data?.collection_id === collection_id &&
                    data?.nft_id === nft_id
                );
                const isActive = product?.find(
                  meta =>
                    meta?.collection.id === collection_id &&
                    meta?.nft.id === nft_id
                );

                const add_key: any = `add_item_stable.${collection_id}/${nft_id}`;

                return (
                  <PoolsConfigModalCard
                    amount={null}
                    id={nft_id}
                    image={currentMetaNFT?.avatar}
                    name={currentMetaNFT?.title || 'unknown'}
                    sx={{
                      borderColor: isActive ? 'primary.a.400' : undefined,
                      onClick: () => {
                        if (!isActive) {
                          return setValue(add_key, {
                            amount: 'infinity',
                            nft: {
                              id: nft_id,
                              title: currentMetaNFT?.title || 'unknown',
                              image: currentMetaNFT?.avatar,
                            },
                            collection: {
                              id: collection_id,
                              title: currentMetaCollection?.title || 'unknown',
                              image: currentMetaCollection?.avatar,
                            },
                          });
                        }
                        setValue(add_key, undefined);
                      },
                    }}
                  />
                );
              })
            )}
          </PoolsConfigModalOuter>
        );

        // when user not search
        if (!search) {
          return JSXElement;
        }

        // find Collection ID
        if (search.toLowerCase() === collectionID) {
          return JSXElement;
        }

        // find Collection Name
        if (collectionName?.includes(search.toLowerCase())) {
          return JSXElement;
        }
      })}
    </PoolsConfigModal>
  );
};
