import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react';

import RatioPicture from 'components/RatioPicture';
import { useAppSelector } from 'hooks/useRedux';
import CloseIcon from 'public/assets/fill/close.svg';

import CollectionJohnGameMenu from './CollectionJohnGameMenu';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CollectionsFieldProps } from '..';

interface CollectionsJohnGameServiceProps {
  address: string;
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
}

interface CollectionsJohnGameProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  watch: UseFormWatch<CollectionsFieldProps>;
}

export default ({ setValue, watch }: CollectionsJohnGameProps) => {
  const { account } = useAppSelector(state => state.injected.polkadot);

  return (
    <>
      {account?.address ? (
        <CollectionJohnGameService
          setValue={setValue}
          watch={watch}
          address={account.address}
        />
      ) : null}
    </>
  );
};

function CollectionJohnGameService({
  address,
  setValue,
  watch,
}: CollectionsJohnGameServiceProps) {
  const product = Object.values(watch().general_join_game || []);

  return (
    <Flex
      justifyContent="space-between"
      gap={4}
      py={3}
      px={4}
      bg="shader.a.900"
      borderRadius="xl"
    >
      <Grid gridTemplateColumns="repeat(4, 1fr)" flex={1} gap={2}>
        {product.length ? (
          product.map(({ game_id }) => (
            <Flex
              key={game_id}
              position="relative"
              gap={2}
              py={2}
              pl={2}
              pr={4}
              borderRadius="xl"
              bg="shader.a.800"
            >
              <RatioPicture src={null} sx={{ width: 10 }} />

              <Box>
                <Text
                  fontSize="sm"
                  color="white"
                  fontWeight="medium"
                  lineHeight={4}
                >
                  {Math.random().toString(36).slice(2, 10)}
                </Text>

                <Text as="span" fontSize="xs" color="shader.a.400">
                  ID: {game_id}
                </Text>
              </Box>

              <Box
                position="absolute"
                inset="0 auto auto 0"
                transform="translate(-25%, -25%)"
                onClick={() => {
                  const instance = product.filter(
                    meta => meta.game_id !== game_id
                  );

                  setValue(`general_join_game`, instance);
                }}
              >
                <Icon
                  as={CloseIcon}
                  width={4}
                  height={4}
                  color="shader.a.300"
                />
              </Box>
            </Flex>
          ))
        ) : (
          <Box color="shader.a.600">Empty</Box>
        )}
      </Grid>

      <CollectionJohnGameMenu
        setValue={setValue}
        address={address}
        product={product}
      />
    </Flex>
  );
}
