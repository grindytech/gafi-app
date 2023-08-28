import { Flex, Icon, Switch, useDisclosure } from '@chakra-ui/react';

import SunIcon from 'public/assets/sun.svg';

export default function FooterSwitchMode() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      gap={2}
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
      <Switch checked={isOpen} onChange={onToggle} />

      <Icon
        color={isOpen ? 'red' : undefined}
        as={SunIcon}
        width={6}
        height={6}
      />
    </Flex>
  );
}
