import { Box, Text, Heading, Icon, Center } from '@chakra-ui/react';
import CardBox from 'components/CardBox';

import GakiIcon from 'public/assets/art/gaki.svg';
import { convertHex } from 'utils/utils';

export default function HomeWelcome() {
  return (
    <CardBox
      background="gradient.linear.1"
      borderRadius="0px 0px 0.75rem 0.75rem"
    >
      <Center
        justifyContent="space-between"
        flexWrap={{
          base: 'wrap',
          lg: 'nowrap',
        }}
      >
        <Box
          padding={{
            base: 4,
            md: 12,
          }}
        >
          <Heading
            color="white"
            fontSize={{
              base: 'md',
              sm: '2xl',
            }}
          >
            Welcome to&nbsp;
            <Text as="span" fontWeight="bold" color="primary.a.200">
              GAFI APP
            </Text>
          </Heading>

          <Text
            color={convertHex('#ffffff', 0.75)}
            fontSize={{
              base: 'sm',
              md: 'md',
            }}
          >
            {`Lorem ipsum dolor sit amet consectetur. Diam bibendum justo
            sollicitudin rutrum. Neque velit commodo convallis lacus iaculis
            eget nisl odio sagittis.`}
          </Text>
        </Box>

        <Box width="full">
          <Icon as={GakiIcon} width="full" height="full" />
        </Box>
      </Center>
    </CardBox>
  );
}
