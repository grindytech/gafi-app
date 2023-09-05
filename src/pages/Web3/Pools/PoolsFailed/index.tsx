import {
  Box,
  Center,
  Input,
  Switch,
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
import { convertHex } from 'utils/utils';
import { PoolsFieldProps } from '..';
import { useEffect } from 'react';

interface NFTsAmountProps {
  register: UseFormRegister<PoolsFieldProps>;
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
}

export default ({ register, setValue, watch }: NFTsAmountProps) => {
  const { add_item_failed } = watch();

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: !!add_item_failed,
  });

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

        <Box
          sx={{
            span: {
              '--switch-bg': '#3F3F46',
              border: '0.0625rem solid',
              borderColor: 'shader.a.600',
              borderRadius: 'xl',
              padding: 1,

              '&[data-checked]': {
                '--switch-bg': '#71717A',
              },
            },
          }}
        >
          <Switch id="isReadOnly" isChecked={isOpen} onChange={onToggle} />
        </Box>
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
            <Input
              type="number"
              variant="validate"
              placeholder="Enter weight"
              border="0.0625rem solid"
              borderColor="shader.a.800"
              bg={convertHex(colors.shader.a[800], 0.25)}
              {...register('add_item_failed')}
            />
          </ChakraBox>
        ) : null}
      </AnimatePresence>
    </>
  );
};
