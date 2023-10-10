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
  const { general_type, add_item_failed, add_item_dynamic, add_item_stable } =
    watch();

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: !!add_item_failed,
  });

  const RarityWeight = () => {
    const type =
      general_type === 'Dynamic Pool'
        ? add_item_dynamic || []
        : add_item_stable || [];

    const product = Object.values(type)
      .filter(meta => !!meta)
      .concat({ weight: add_item_failed } as never)
      .map(meta => ({ ...meta, weight: meta.weight || 0 }));

    return CalculatorOfRarity(
      add_item_failed as number,
      product.map(meta => meta.weight)
    );
  };

  useEffect(() => {
    // null mean variable not exist
    if (!isOpen) {
      setValue(`add_item_failed`, null);
    }

    // undefined mean variable exist but not have value
    if (isOpen && !add_item_failed) {
      setValue(`add_item_failed`, undefined);
    }
  }, [isOpen, add_item_failed]);

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
                {...register('add_item_failed')}
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
