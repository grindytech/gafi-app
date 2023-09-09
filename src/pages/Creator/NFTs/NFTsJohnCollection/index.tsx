import { Box, Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'hooks/useRedux';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { NFTsFieldProps } from '..';
import NFTsJohnCollectionMenu from './NFTsJohnCollectionMenu';
import John from 'layouts/John';

interface NFTsJohnCollectionProps {
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
}

export default ({ setValue, watch }: NFTsJohnCollectionProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { general_join_collection } = watch();

  return (
    <Flex
      gap={4}
      py={3}
      px={4}
      bg="shader.a.900"
      borderRadius="xl"
      alignItems="flex-start"
    >
      <Box flex={1}>
        {general_join_collection ? (
          <John
            name={general_join_collection.option?.title}
            id={general_join_collection.collection_id}
            image={general_join_collection.option?.avatar}
          />
        ) : (
          <Text color="shader.a.600">Choose a collection to join</Text>
        )}
      </Box>

      {account?.address ? (
        <NFTsJohnCollectionMenu
          setValue={setValue}
          address={account.address}
          watch={watch}
        />
      ) : null}
    </Flex>
  );
};
