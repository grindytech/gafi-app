import { Box, Center, Switch, Text, useDisclosure } from '@chakra-ui/react';
import ChakraBox from 'components/ChakraBox';
import { AnimatePresence } from 'framer-motion';
import { PropsWithChildren, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { PoolsFieldProps } from '..';

interface PoolsConfigStateProps extends PropsWithChildren {
  watch: PoolsFieldProps['add_item_supply'] | null;
  setValue: UseFormSetValue<PoolsFieldProps>;
  add_key: keyof PoolsFieldProps;
}

export default ({
  children,
  watch,
  setValue,
  add_key,
}: PoolsConfigStateProps) => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: !!watch,
  });

  useEffect(() => {
    // null mean variable not exist
    if (!isOpen) {
      setValue(add_key, null);
    }

    // undefined mean variable exist but not have value
    if (isOpen && !watch) {
      setValue(add_key, undefined);
    }
  }, [isOpen, watch]);

  return (
    <>
      <Center
        justifyContent="space-between"
        padding={4}
        borderRadius={isOpen ? '0.75rem 0.75rem 0 0' : 'xl'}
        bg="shader.a.900"
      >
        <Box>
          <Text fontWeight="medium" color="shader.a.300">
            Normal state
          </Text>

          <Text fontSize="sm" color="shader.a.400">
            User will earn item based on your config
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
            {children}
          </ChakraBox>
        ) : null}
      </AnimatePresence>
    </>
  );
};
