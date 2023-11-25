import {
  Box,
  Center,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import ChakraBox from 'components/ChakraBox';
import { AnimatePresence } from 'framer-motion';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { colors } from 'theme/theme';
import { CalculatorOfRarity, ColorOfRarity, convertHex } from 'utils';
import { PoolsFieldProps } from '..';
import { useEffect } from 'react';
import SwitchMode from 'components/SwitchMode';

interface NFTsAmountProps {
  register: UseFormRegister<PoolsFieldProps>;
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
}

export default ({ register, setValue, watch }: NFTsAmountProps) => {
  const { supply, type_pool, failed } = watch();

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen:
      type_pool === 'Dynamic Pool'
        ? !!supply?.['Dynamic Pool']?.length
        : !!supply?.['Stable Pool']?.length,
  });

  const RarityWeight = () => {
    const type =
      type_pool === 'Dynamic Pool'
        ? supply?.['Dynamic Pool'] || []
        : supply?.['Stable Pool'] || [];

    const product = Object.values(type)
      .filter(meta => !!meta)
      .concat({ weight: failed } as never)
      .map(meta => ({ ...meta, weight: meta.weight || 0 }));

    return CalculatorOfRarity(
      failed as number,
      product.map(meta => meta.weight)
    );
  };

  useEffect(() => {
    if (!isOpen) {
      setValue(`failed`, null);
    }
  }, [isOpen]);

  return (
    <>
      <Center
        justifyContent="space-between"
        padding={4}
        mt={4}
        borderRadius={isOpen ? '0.75rem 0.75rem 0 0' : 'xl'}
        bg="shader.a.900"
      >
        <Box>
          <Text fontWeight="medium" color="shader.a.300">
            Failed state
          </Text>

          <Text fontSize="sm" color="shader.a.400">
            User won’t earn anything from pool
          </Text>
        </Box>

        <SwitchMode isChecked={isOpen} onChange={onToggle} />
      </Center>

      <AnimatePresence>
        {isOpen ? (
          <ChakraBox
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            borderTop="0.0625rem solid"
            borderColor="shader.a.800"
            bg="shader.a.900"
            borderRadius="0 0 0.75rem 0.75rem"
            padding={4}
          >
            <Text mb={4} fontSize="sm" fontWeight="medium" color="shader.a.400">
              Weight
            </Text>

            <InputGroup
              borderRadius="xl"
              border="0.0625rem solid"
              borderColor="shader.a.700"
              height={12}
            >
              <Input
                type="number"
                variant="unstyled"
                placeholder="Enter weight"
                px={3}
                color="shader.a.300"
                _placeholder={{ color: 'shader.a.500' }}
                {...register('failed', {
                  valueAsNumber: true,
                })}
              />

              <InputRightAddon
                color="shader.a.300"
                bg={convertHex(colors.shader.a[800], 0.25)}
                border="unset"
                borderLeft="0.0625rem solid"
                borderColor="shader.a.800"
                px={3.5}
                height="full"
              >
                Rarity:&nbsp;
                <Text
                  as="span"
                  color={ColorOfRarity(RarityWeight())}
                  fontWeight="medium"
                >
                  {RarityWeight()}%
                </Text>
              </InputRightAddon>
            </InputGroup>
          </ChakraBox>
        ) : null}
      </AnimatePresence>
    </>
  );
};
