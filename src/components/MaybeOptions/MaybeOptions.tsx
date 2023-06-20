import { Box, Flex, FlexProps, Switch, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { PropsWithChildren } from 'react';

interface MaybeOptionsProps extends PropsWithChildren {
  isOpen: boolean;
  onToggle: () => void;
  sx?: FlexProps;
}

export default function MaybeOptions({
  children,
  isOpen,
  onToggle,
  sx,
}: MaybeOptionsProps) {
  const padding = 4;

  return (
    <>
      <CardBox variant="createGames" padding={0}>
        <Flex padding={padding} gap={2} {...sx}>
          <Text fontSize="sm" fontWeight="medium" color="shader.a.700">
            None:
          </Text>

          <Switch onChange={onToggle} />
        </Flex>

        {isOpen ? (
          <Box
            borderTop="0.0625rem solid"
            borderColor="shader.a.300"
            padding={padding}
          >
            {children}
          </Box>
        ) : null}
      </CardBox>
    </>
  );
}
