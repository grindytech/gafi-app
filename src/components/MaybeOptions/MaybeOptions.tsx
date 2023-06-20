import { Flex, FlexProps, Heading, Switch } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { PropsWithChildren } from 'react';

interface MaybeOptionsProps extends PropsWithChildren {
  title: string;
  isOpen: boolean;
  sx?: FlexProps;
  onToggle: () => void;
}

export default function MaybeOptions({
  title,
  isOpen,
  onToggle,
  sx,
  children,
}: MaybeOptionsProps) {
  const padding = 4;

  return (
    <CardBox variant="createGames" padding={0}>
      <Flex padding={padding} justifyContent="space-between" gap={2} {...sx}>
        <Heading variant="game">{title}</Heading>

        <Switch onChange={onToggle} />
      </Flex>

      {isOpen ? (
        <Flex
          flexDirection="column"
          sx={{
            '> div': {
              borderTop: '0.0625rem solid',
              borderColor: 'shader.a.300',
              padding,
            },
          }}
        >
          {children}
        </Flex>
      ) : null}
    </CardBox>
  );
}
