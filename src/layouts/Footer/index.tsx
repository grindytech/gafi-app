import { Center, Flex, Text } from '@chakra-ui/react';

import FooterSwitchMode from './FooterSwitchMode';

export default function Footer() {
  return (
    <Center
      as="footer"
      position="relative"
      padding={4}
      justifyContent="space-between"
      fontSize="sm"
      color="shader.a.300"
      flexDirection={{
        base: 'column',
        md: 'row',
      }}
      gap={{
        base: 4,
        md: 8,
      }}
      _before={{
        content: `''`,
        zIndex: '-1',
        bg: '#27272A',
        position: 'absolute',
        inset: '50% auto auto 50%',
        transform: 'translate(-50%, -50%)',
        width: '100vw',
        height: '100%',
      }}
    >
      <Text>
        © 2023 Powered by&nbsp;
        <Text as="span" color="shader.a.300" fontWeight="medium">
          Grindy Technologies
        </Text>
      </Text>

      <Flex
        gap={{
          base: 4,
          md: 8,
        }}
        flexWrap="wrap"
        justifyContent="center"
      >
        <Text>Privacy Policy</Text>

        <Text>Terms of Service</Text>

        <FooterSwitchMode />
      </Flex>
    </Center>
  );
}
