import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default ({ children }: PropsWithChildren) => {
  return (
    <Flex
      mt={6}
      gap={4}
      flexWrap={{
        base: 'wrap-reverse',
        lg: 'unset',
      }}
      sx={{
        '> div': {
          _first: {
            width: 'full',
            flexBasis: { lg: '70%' },
          },
          _last: {
            width: 'full',
            flexBasis: { lg: '30%' },
          },
        },
      }}
    >
      {children}
    </Flex>
  );
};
