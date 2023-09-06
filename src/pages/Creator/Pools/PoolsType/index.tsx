import JohnPopover from 'layouts/John/JohnPopover';
import { PoolsFieldProps } from '..';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';

interface PoolsTypeProps {
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
}

export default ({ setValue, watch }: PoolsTypeProps) => {
  const { general_type } = watch();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const type: Array<PoolsFieldProps['general_type']> = [
    'Dynamic Pool',
    'Stable Pool',
  ];

  useEffect(() => {
    if (!general_type) {
      setValue(`general_type`, 'Dynamic Pool');
    }
  }, []);

  return (
    <Flex
      padding={3}
      justifyContent="space-between"
      borderRadius="xl"
      bg="shader.a.900"
    >
      <Text color="shader.a.300" fontWeight="medium" flex={1}>
        {general_type}
      </Text>

      <JohnPopover
        isOpen={isOpen}
        onToggle={onToggle}
        onClose={onClose}
        sx={{
          sx: {
            '.chakra-popover__content': { height: 'auto' },
          },
        }}
      >
        {type.map(meta => (
          <Text
            key={meta}
            px={4}
            py={3}
            color="white"
            cursor="pointer"
            fontWeight="medium"
            transitionDuration="ultra-slow"
            onClick={() => {
              setValue(`general_type`, meta);
              onClose();
            }}
            _hover={{
              bg: 'shader.a.800',
            }}
          >
            {meta}
          </Text>
        ))}
      </JohnPopover>
    </Flex>
  );
};
