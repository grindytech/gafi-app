import { Box, Center, Input, Text, useDisclosure } from '@chakra-ui/react';
import ChakraBox from 'components/ChakraBox';
import { AnimatePresence } from 'framer-motion';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { colors } from 'theme/theme';
import { convertHex } from 'utils';
import { NFTsFieldProps } from '..';
import { useEffect } from 'react';
import SwitchMode from 'components/SwitchMode';

interface NFTsAmountProps {
  register: UseFormRegister<NFTsFieldProps>;
  setValue: UseFormSetValue<NFTsFieldProps>;
}

export default ({ register, setValue }: NFTsAmountProps) => {
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    setValue(`general_amount`, null);
  }, [isOpen]);

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
            {isOpen ? 'Limit amount' : '∞ Infinity amount'}
          </Text>

          <Text fontSize="sm" color="shader.a.500">
            {isOpen
              ? 'Your item amount is limited'
              : 'Your item amount is unlimited'}
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
            <Input
              type="number"
              variant="validate"
              placeholder="Enter amount"
              border="0.0625rem solid"
              borderColor="shader.a.800"
              bg={convertHex(colors.shader.a[800], 0.25)}
              {...register('general_amount')}
            />
          </ChakraBox>
        ) : null}
      </AnimatePresence>
    </>
  );
};
