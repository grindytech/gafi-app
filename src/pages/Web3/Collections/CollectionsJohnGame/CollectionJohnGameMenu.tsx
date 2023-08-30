import {
  Box,
  Center,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import { Option, StorageKey, u32 } from '@polkadot/types';
import { PalletGameGameDetails } from '@polkadot/types/lookup';
import { useQuery } from '@tanstack/react-query';
import RatioPicture from 'components/RatioPicture';
import { useAppSelector } from 'hooks/useRedux';
import { UseFormSetValue } from 'react-hook-form';
import Chevron01Icon from 'public/assets/line/chevron-01.svg';
import { useRef } from 'react';
import { CollectionsFieldProps } from '..';

interface CollectionsJohnGameMenuProps {
  setValue: UseFormSetValue<CollectionsFieldProps>;
  product: CollectionsFieldProps['general_join_game'];
  address: string;
}

export default ({
  setValue,
  product,
  address,
}: CollectionsJohnGameMenuProps) => {
  const { api } = useAppSelector(state => state.substrate);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const ref_container = useRef(null);

  const { data } = useQuery({
    queryKey: ['web3_collection_menu', address],
    queryFn: async () => {
      if (api && address) {
        const service = await api.query.game.game.entries();

        return Promise.all(
          service.map(
            async ([game_id, option]: [
              StorageKey<[u32]>,
              Option<PalletGameGameDetails>
            ]) => {
              const getOwner = option.value.owner.toString() === address;
              const getRole = option.value.admin.toString() === address;

              if (getOwner || getRole) {
                return {
                  game_id: game_id.args[0].toNumber(),
                };
              }
            }
          )
        ).then(data =>
          data.filter((meta): meta is NonNullable<typeof meta> => !!meta)
        );
      }

      // not found
      return [];
    },
    enabled: !!api?.query.nfts,
  });

  useOutsideClick({
    ref: ref_container,
    handler: () => onClose(),
    enabled: isOpen,
  });

  const filter = data?.length
    ? data.filter(
        meta => !product.some(({ game_id }) => meta.game_id === game_id)
      )
    : null;

  return (
    <Flex ref={ref_container}>
      <Icon
        as={Chevron01Icon}
        width={6}
        height={6}
        color="white"
        cursor="pointer"
        onClick={onToggle}
      />

      <List
        opacity={isOpen ? 1 : 0}
        pointerEvents={isOpen ? undefined : 'none'}
        position="absolute"
        inset="auto 0 0 0"
        transform="translateY(98%)"
        zIndex="docked"
        bg="shader.a.800"
        borderRadius="0 0 0.75rem 0.75rem"
        overflowY="auto"
        height={filter && filter?.length >= 2 ? 40 : 20}
        transitionDuration="ultra-slow"
      >
        {filter?.length ? (
          filter.map(meta => (
            <ListItem
              key={meta.game_id}
              transitionDuration="ultra-slow"
              padding={4}
              display="flex"
              color="white"
              cursor="pointer"
              fontWeight="medium"
              gap={2}
              _hover={{
                bg: 'shader.a.900',
              }}
              onClick={() => {
                setValue(`general_join_game.${meta.game_id}`, meta);
              }}
            >
              <RatioPicture src={null} sx={{ width: 12, height: 12 }} />

              <Box>
                <Text lineHeight={4}>
                  {Math.random().toString(36).slice(2, 10)}
                </Text>
                <Text as="span" fontSize="sm">
                  ID: {meta.game_id}
                </Text>
              </Box>
            </ListItem>
          ))
        ) : (
          <Center color="white" height="full">
            Empty
          </Center>
        )}
      </List>
    </Flex>
  );
};
