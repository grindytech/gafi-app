import { UseFormSetValue } from 'react-hook-form';
import { PoolsFieldProps, PoolsProductType } from '..';
import useMetaCollection from 'hooks/useMetaCollection';
import React, { useState } from 'react';
import PoolsConfigModal from './PoolsConfigModal';
import { Box, Center, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import RatioPicture from 'components/RatioPicture';
import { convertHex } from 'utils';
import BlockIcon from 'public/assets/line/block.svg';
import { TypeSwaggerNFTData } from 'types/swagger.type';

interface PoolsConfigProductProps {
  pool_type: PoolsFieldProps['type_pool'];
  supply: TypeSwaggerNFTData['data'];
  product: PoolsProductType[]; // to show isActive selected

  onClose: () => void;
  setValue: UseFormSetValue<PoolsFieldProps>;
}

export default ({
  pool_type,
  product,
  supply,

  onClose,
  setValue,
}: PoolsConfigProductProps) => {
  const { MetaCollection } = useMetaCollection({
    key: `creator_pool`,
    filter: 'collection_id',
    arg: supply.map(({ collection_id }) => collection_id),
  });

  const groupItemOfBalance = () => {
    const result = supply?.reduce(function (r, a) {
      r[a.collection_id] = r[a.collection_id] || [];
      r[a.collection_id].push(a);
      return r;
    }, Object.create(null));

    return result as TypeSwaggerNFTData['data'][number][][];
  };

  const [search, setSearch] = useState('');

  return (
    <PoolsConfigModal
      onClose={onClose}
      setValue={setValue}
      product={product}
      setSearch={setSearch}
      pool_type={pool_type}
    >
      {Object.entries(groupItemOfBalance()).map(([key, meta]) => {
        const currentMetaCollection = MetaCollection?.find(
          data => data?.collection_id === Number(key)
        );

        const collectionID = key?.toLowerCase();
        const collectionName = currentMetaCollection?.name?.toLowerCase();

        const JSXElement = (
          <Box
            key={key}
            overflow="auto"
            padding={4}
            _notFirst={{
              borderTop: '0.0625rem solid',
              borderColor: 'shader.a.900',
            }}
          >
            <Center justifyContent="space-between">
              <Flex gap={2}>
                <Box height={10} width={10}>
                  <RatioPicture
                    src={collectionName || null}
                    sx={{ height: 'full', width: 'full' }}
                  />
                </Box>

                <Box>
                  <Text fontSize="xs" color="shader.a.400">
                    {currentMetaCollection?.name}
                  </Text>
                  <Text fontSize="sm" color="white" fontWeight="medium">
                    ID: {key}
                  </Text>
                </Box>
              </Flex>

              <Text color="primary.a.300" fontSize="sm" fontWeight="medium">
                {length} Items
              </Text>
            </Center>

            <Grid
              flexWrap="wrap"
              gridTemplateColumns={{
                base: 'repeat(4, 11.5rem)',
                md: 'repeat(4, 1fr)',
              }}
              mt={4}
              gap={3}
            >
              {React.Children.toArray(
                meta.map(({ collection_id, token_id, supply, image, name }) => {
                  const isActive = product?.find(
                    meta =>
                      meta?.collection?.id === collection_id &&
                      meta?.nft?.id === token_id
                  );

                  const add_key = `supply.${pool_type}.${collection_id}/${token_id}`;

                  return (
                    <Box
                      overflow="hidden"
                      position="relative"
                      borderRadius="xl"
                      border="0.125rem solid transparent"
                      borderColor={isActive ? 'primary.a.400' : undefined}
                      bg="shader.a.900"
                      onClick={() => {
                        if (!isActive) {
                          // PoolsProductType
                          const parse = {
                            amount: supply,
                            nft: {
                              id: token_id,
                              name: name,
                              image: image,
                            },
                            collection: {
                              id: collection_id,
                              name: currentMetaCollection?.name,
                              logo: currentMetaCollection?.logo,
                            },
                          };
                          return setValue(add_key as any, parse);
                        }

                        setValue(add_key as any, undefined);
                      }}
                    >
                      <RatioPicture
                        src={image || null}
                        sx={{ width: 'full' }}
                      />

                      <Flex
                        justifyContent="space-between"
                        color="white"
                        fontWeight="medium"
                        py={3}
                        px={4}
                        gap={2}
                      >
                        <Text wordBreak="break-word">{name}</Text>

                        <Text color="shader.a.500" fontSize="sm">
                          ID:&nbsp;
                          <Text as="span" color="white">
                            {token_id}
                          </Text>
                        </Text>
                      </Flex>

                      <Center
                        borderRadius="md"
                        bg={convertHex('#000000', 0.3)}
                        px={1.5}
                        py={1}
                        gap={1}
                        color="white"
                        backdropFilter="blur(2rem)"
                        position="absolute"
                        top={0}
                        margin={2}
                      >
                        <Icon as={BlockIcon} width={4} height={4} />

                        <Text fontSize="sm" fontWeight="medium">
                          {supply ? 'x' + supply : 'Inifnity'}
                        </Text>
                      </Center>
                    </Box>
                  );
                })
              )}
            </Grid>
          </Box>
        );

        // when user not search
        if (!search) {
          return JSXElement;
        }

        // find Collection ID
        if (search?.toLowerCase() === collectionID) {
          return JSXElement;
        }

        // // find Collection Name
        if (collectionName?.includes(search?.toLowerCase())) {
          return JSXElement;
        }
      })}
    </PoolsConfigModal>
  );
};
