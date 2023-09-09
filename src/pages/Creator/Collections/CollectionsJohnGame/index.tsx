import { Box, Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'hooks/useRedux';

import CollectionJohnGameMenu from './CollectionJohnGameMenu';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CollectionsFieldProps } from '..';
import John from 'layouts/John';

interface CollectionsJohnGameProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
}

export default ({ setValue, watch }: CollectionsJohnGameProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const { general_join_game } = watch();

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
        {general_join_game ? (
          <John
            name={general_join_game.option?.title}
            image={general_join_game.option?.avatar}
            id={general_join_game.game_id}
            remove={() => {
              setValue(`general_join_game`, undefined);
            }}
          />
        ) : (
          <Text color="shader.a.600">Choose a game to join.</Text>
        )}
      </Box>

      {account?.address ? (
        <CollectionJohnGameMenu
          setValue={setValue}
          address={account.address}
          watch={watch}
        />
      ) : null}
    </Flex>
  );
};
