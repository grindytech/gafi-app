import {
  Box,
  Center,
  Heading,
  Icon,
  IconButton,
  Switch,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React from 'react';
import ChakraBox from 'components/ChakraBox';
import CloseIcon from 'public/assets/line/close.svg';

interface MaybeOptionsProps extends React.PropsWithChildren {
  title: string;
  childrenOption?: React.ReactNode;
  toggle: boolean;
  switchClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  closeClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function MaybeOptions({
  title,
  children,
  childrenOption,
  toggle,
  switchClick,
  closeClick,
}: MaybeOptionsProps) {
  return (
    <CardBox variant="createGames" padding={0}>
      <Center padding={4} justifyContent="space-between" gap={2}>
        <Heading variant="game">{title}</Heading>

        <Center gap={4}>
          <Switch onChange={switchClick} />

          {closeClick ? (
            <IconButton
              onClick={closeClick}
              aria-label="arrow-close"
              icon={
                <Icon
                  as={CloseIcon}
                  width={6}
                  height={6}
                  color="shader.a.900"
                />
              }
            />
          ) : null}
        </Center>
      </Center>

      <ChakraBox
        overflow={toggle ? undefined : 'hidden'}
        animate={{
          height: toggle ? undefined : 0,
        }}
        sx={{
          '> div': {
            borderTop: '0.0625rem solid',
            borderColor: 'shader.a.300',
            padding: 4,
          },
        }}
      >
        {childrenOption}
      </ChakraBox>

      <Box
        sx={{
          '> div': {
            borderTop: '0.0625rem solid',
            borderColor: 'shader.a.300',
            padding: 4,
          },
        }}
      >
        {children}
      </Box>
    </CardBox>
  );
}
