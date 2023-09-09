import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import { cloundinary_link } from 'axios/cloudinary_axios';
import RatioPicture from 'components/RatioPicture';
import { colors } from 'theme/theme';
import { CalculatorOfRarity, ColorOfRarity, convertHex } from 'utils/utils';
import { PoolsFieldProps } from '..';
import { UseFormRegister } from 'react-hook-form';

interface PoolsConfigSelectProps {
  onToggle: () => void;
  product: PoolsFieldProps['add_item_supply'];
  register: UseFormRegister<PoolsFieldProps>;
  add_key: keyof PoolsFieldProps;
  add_item_failed: number | null | undefined;
}

export default ({
  onToggle,
  product,
  register,
  add_key,
  add_item_failed,
}: PoolsConfigSelectProps) => {
  return (
    <>
      {product?.length ? (
        product.map(({ collection, nft, amount, weight }) => {
          const key = `${add_key}.${collection.id}/${nft.id}.weight` as any;

          const getWeight = CalculatorOfRarity(
            weight,
            product
              .concat({ weight: add_item_failed || 0 } as never)
              .map(meta => meta.weight)
          );

          return (
            <Center
              key={`${collection.id}/${nft.id}`}
              bg={convertHex(colors.shader.a[800], 0.25)}
              borderRadius="xl"
              border="0.0625rem solid"
              borderColor="shader.a.800"
              padding={3}
              justifyContent="space-between"
              flexWrap="wrap"
              gap={3}
              _notFirst={{
                mt: 2,
              }}
            >
              <Flex gap={2}>
                <RatioPicture
                  src={nft.image ? cloundinary_link(nft.image) : null}
                  sx={{
                    padding: 2,
                    borderRadius: 'lg',
                    bg: 'shader.a.800',
                    sx: {
                      '> div': { width: 12, height: 12 },
                    },
                  }}
                />

                <Box fontSize="sm">
                  <Text color="shader.a.300" fontSize="xs">
                    {collection?.title}
                  </Text>
                  <Text color="white" fontWeight="medium">
                    {nft?.title}
                  </Text>

                  <Text color="primary.a.300">
                    {amount ? 'x' + amount : 'Infinity'}
                  </Text>
                </Box>
              </Flex>

              <InputGroup
                gap={2}
                width={{
                  base: 'full',
                  md: 'auto',
                }}
                borderRadius="xl"
                border="0.0625rem solid"
                borderColor="shader.a.700"
              >
                <Input
                  variant="unstyled"
                  px={4}
                  placeholder="Enter weight"
                  color="shader.a.300"
                  width={{
                    base: 'full',
                    md: 28,
                  }}
                  fontSize="sm"
                  _placeholder={{ color: 'shader.a.500' }}
                  {...register(key, { required: true })}
                />

                <InputRightAddon
                  color="shader.a.300"
                  bg={convertHex(colors.shader.a[800], 0.25)}
                  border="unset"
                  borderLeft="0.0625rem solid"
                  borderColor="shader.a.800"
                  px={3}
                  width="8.125rem"
                >
                  Rarity:&nbsp;
                  <Text
                    as="span"
                    color={ColorOfRarity(getWeight)}
                    fontWeight="medium"
                  >
                    {getWeight}%
                  </Text>
                </InputRightAddon>
              </InputGroup>
            </Center>
          );
        })
      ) : (
        <Button
          variant="unstyled"
          width="full"
          color="white"
          fontWeight="medium"
          borderRadius="xl"
          bg="shader.a.800"
          textAlign="center"
          padding={2}
          onClick={onToggle}
        >
          Select items
        </Button>
      )}
    </>
  );
};
