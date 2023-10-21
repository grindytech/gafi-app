import { Box, Center, Text, useDisclosure } from '@chakra-ui/react';
import ChakraBox from 'components/ChakraBox';
import { AnimatePresence } from 'framer-motion';
import { PropsWithChildren, useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { PoolsFieldProps } from '..';
import SwitchMode from 'components/SwitchMode';

interface PoolsConfigStateProps extends PropsWithChildren {
  value: boolean;
  setValue: UseFormSetValue<PoolsFieldProps>;
  add_key: PoolsFieldProps['type_pool'];
}

export default ({
  children,
  value,
  setValue,
  add_key,
}: PoolsConfigStateProps) => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: !!value,
  });

  useEffect(() => {
    if (!isOpen) {
      setValue(`supply.${add_key}`, null);
    }

    if (isOpen && !value) {
      setValue(`supply.${add_key}`, undefined);
    }
  }, [isOpen, value]);

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
            {children}
          </ChakraBox>
        ) : null}
      </AnimatePresence>
    </>
  );
};
