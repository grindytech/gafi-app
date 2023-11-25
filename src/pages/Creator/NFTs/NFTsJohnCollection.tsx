import { Box, Flex, Text } from '@chakra-ui/react';

import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { NFTsFieldProps } from '.';
import NFTsJohnCollectionMenu from './NFTsJohnCollectionMenu';
import John from 'layouts/John';
import { useAccountContext } from 'contexts/contexts.account';

interface NFTsJohnCollectionProps {
  setValue: UseFormSetValue<NFTsFieldProps>;
  watch: UseFormWatch<NFTsFieldProps>;
}

export default ({ setValue, watch }: NFTsJohnCollectionProps) => {
  const { account } = useAccountContext();

  const { john_collection } = watch();

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
        {john_collection ? (
          <John
            name={john_collection.meta?.name}
            image={john_collection.meta?.logo}
            id={john_collection.id}
          />
        ) : (
          <Text color="shader.a.600">Choose a collection to join</Text>
        )}
      </Box>

      {account.current?.address ? (
        <NFTsJohnCollectionMenu
          setValue={setValue}
          address={account.current.address}
          watch={watch}
        />
      ) : (
        <Text color="shader.a.600">Empty</Text>
      )}
    </Flex>
  );
};
