import { Box, Flex, FlexProps, Heading, Switch } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { PropsWithChildren } from 'react';

interface MaybeOptionsProps extends PropsWithChildren {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  sx?: FlexProps;
}

export default function MaybeOptions({
  children,
  isOpen,
  onToggle,
  title,
  sx,
}: MaybeOptionsProps) {
  const padding = 4;

  return (
    <CardBox variant="createGames" padding={0}>
      <Flex padding={padding} justifyContent="space-between" gap={2} {...sx}>
        <Heading variant="game">{title}</Heading>

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
  );
}
