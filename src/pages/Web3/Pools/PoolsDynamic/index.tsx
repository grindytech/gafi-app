import { ItemBalanceOfProps } from 'hooks/useItemBalanceOf';
import { UseFormSetValue } from 'react-hook-form';
import { PoolsFieldProps } from '..';
import useMetaCollection from 'hooks/useMetaCollection';
import useMetaNFT from 'hooks/useMetaNFT';
import React, { useState } from 'react';
import PoolsConfigModal from '../PoolsConfig/PoolsConfigModal';
import PoolsConfigModalOuter from '../PoolsConfig/PoolsConfigModal/PoolsConfigModalOuter';
import PoolsConfigModalCard from '../PoolsConfig/PoolsConfigModal/PoolsConfigModalCard';

interface PoolsDynamicProp {
  onClose: () => void;
  itemBalanceOf: ItemBalanceOfProps[];
  setValue: UseFormSetValue<PoolsFieldProps>;
  product: PoolsFieldProps['add_item_supply'];
}

export default ({
  itemBalanceOf,
  onClose,
  setValue,
  product,
}: PoolsDynamicProp) => {
  const { MetaCollection } = useMetaCollection({
    key: `web3_pool`,
    filter: 'collection_id',
    arg: itemBalanceOf.map(({ collection_id }) => collection_id),
  });

  const { metaNFT } = useMetaNFT({
    key: `web3_pool`,
    filter: 'collection_id',
    arg: itemBalanceOf.map(({ nft_id, collection_id }) => ({
      nft_id,
      collection_id,
    })),
  });

  const groupItemOfBalance = () => {
    const result = itemBalanceOf.reduce(function (r, a) {
      r[a.collection_id] = r[a.collection_id] || [];
      r[a.collection_id].push(a);
      return r;
    }, Object.create(null));

    return result as ItemBalanceOfProps[][];
  };

  const [search, setSearch] = useState('');

  return (
    <PoolsConfigModal
      onClose={onClose}
      setValue={setValue}
      product={product}
      setSearch={setSearch}
      add_key="add_item_dynamic"
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
            image={currentMetaCollection?.image}
            name={currentMetaCollection?.title || '-'}
            length={meta.length}
          >
            {React.Children.toArray(
              meta.map(({ amount, collection_id, nft_id }) => {
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

                const add_key =
                  `add_item_dynamic.${collection_id}/${nft_id}` as any;

                return (
                  <PoolsConfigModalCard
                    amount={amount}
                    id={nft_id}
                    image={currentMetaNFT?.image}
                    name={currentMetaNFT?.title || '-'}
                    sx={{
                      borderColor: isActive ? 'primary.a.400' : undefined,
                      onClick: () => {
                        if (!isActive) {
                          return setValue(add_key, {
                            amount,
                            nft: {
                              id: nft_id,
                              title: currentMetaNFT?.title || '-',
                              image: currentMetaNFT?.image,
                            },
                            collection: {
                              id: collection_id,
                              title: currentMetaCollection?.title || '-',
                              image: currentMetaCollection?.image,
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

        // // find Collection Name
        if (collectionName?.includes(search.toLowerCase())) {
          return JSXElement;
        }
      })}
    </PoolsConfigModal>
  );
};
