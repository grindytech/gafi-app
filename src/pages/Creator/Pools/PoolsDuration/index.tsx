import JohnPopover from 'layouts/John/JohnPopover';
import { PoolsFieldProps } from '..';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { BLOCK_TIME } from 'utils/utils.contants';

interface PoolsDurationProps {
  setValue: UseFormSetValue<PoolsFieldProps>;
  watch: UseFormWatch<PoolsFieldProps>;
}

export default ({ setValue, watch }: PoolsDurationProps) => {
  const { general_duration } = watch();
  const { isOpen, onClose, onToggle } = useDisclosure();

  const ListDuration = [
    {
      text: '1 Minutes',
      time: 60 / BLOCK_TIME,
    },
    {
      text: '5 Minutes',
      time: 300 / BLOCK_TIME,
    },
    {
      text: '1 Hours',
      time: 3600 / BLOCK_TIME,
    },
    {
      text: '1 Day',
      time: (86400 * 1) / BLOCK_TIME,
    },
    {
      text: '1 Week',
      time: (86400 * 7) / BLOCK_TIME,
    },
    {
      text: '2 Weeks',
      time: (86400 * 14) / BLOCK_TIME,
    },
    {
      text: '1 Month',
      time: (86400 * 30) / BLOCK_TIME,
    },
  ];

  useEffect(() => {
    if (!general_duration) {
      setValue(`general_duration`, ListDuration[0]);
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
        {general_duration?.text}
      </Text>

      <JohnPopover isOpen={isOpen} onToggle={onToggle} onClose={onClose}>
        {ListDuration.map(meta => (
          <Text
            key={meta.text}
            px={4}
            py={3}
            color="white"
            cursor="pointer"
            fontWeight="medium"
            transitionDuration="ultra-slow"
            onClick={() => {
              setValue(`general_duration`, meta);
              onClose();
            }}
            _hover={{
              bg: 'shader.a.800',
            }}
          >
            {meta.text}
          </Text>
        ))}
      </JohnPopover>
    </Flex>
  );
};
