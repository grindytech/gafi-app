import { Flex, Grid } from '@chakra-ui/react';

import { useAppSelector } from 'hooks/useRedux';

import CollectionJohnGameMenu from './CollectionJohnGameMenu';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CollectionsFieldProps } from '..';
import John from 'layouts/John';
import JohnEmpty from 'layouts/John/JohnEmpty';

interface CollectionsJohnGameProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
}

export default ({ setValue, watch }: CollectionsJohnGameProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);
  const general_join_game = Object.values(watch().general_join_game || []);

  return (
    <Flex
      gap={4}
      py={3}
      px={4}
      bg="shader.a.900"
      borderRadius="xl"
      alignItems="flex-start"
    >
      <Grid
        gridTemplateColumns={{
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(2, 1fr)',
          xl: 'repeat(4, 1fr)',
        }}
        flex={1}
        gap={2}
      >
        {general_join_game.length ? (
          general_join_game.map(meta => (
            <John
              key={meta.game_id}
              name={meta.option?.title || '-'}
              image={meta.option?.image}
              id={meta.game_id}
              remove={() => {
                const instance = general_join_game.filter(
                  ({ game_id }) => meta.game_id !== game_id
                );

                setValue(`general_join_game`, instance);
              }}
              sx={{ pr: 0 }}
            />
          ))
        ) : (
          <JohnEmpty />
        )}
      </Grid>

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
