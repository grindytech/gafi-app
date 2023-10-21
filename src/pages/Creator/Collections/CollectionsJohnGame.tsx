import { Box, Flex, Text } from '@chakra-ui/react';

import CollectionJohnGameMenu from './CollectionJohnGameMenu';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CollectionsFieldProps } from '.';
import John from 'layouts/John';
import { useAccountContext } from 'contexts/contexts.account';

interface CollectionsJohnGameProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
}

export default ({ setValue, watch }: CollectionsJohnGameProps) => {
  const { account } = useAccountContext();

  const { john_game } = watch();

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
        {john_game ? (
          <John
            name={john_game.meta?.name}
            image={john_game.meta?.logo}
            id={john_game.id}
            remove={() => {
              setValue(`john_game`, undefined);
            }}
          />
        ) : (
          <Text color="shader.a.600">Choose a game to join.</Text>
        )}
      </Box>

      {account.current?.address ? (
        <CollectionJohnGameMenu
          setValue={setValue}
          address={account.current.address}
          watch={watch}
        />
      ) : null}
    </Flex>
  );
};
