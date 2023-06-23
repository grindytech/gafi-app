import { Center, HStack, Heading, Icon, IconButton } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { PropsWithChildren } from 'react';
import CloseIcon from 'public/assets/line/close.svg';
import Chevron01Icon from 'public/assets//line/chevron-01.svg';
import ChakraBox from 'components/ChakraBox';

interface MaybeOptionsProps extends PropsWithChildren {
  title: string;
  arrow: {
    isChecked: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
  close?: {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
}

export default function MaybeOptions({
  title,
  arrow,
  close,
  children,
}: MaybeOptionsProps) {
  return (
    <CardBox variant="createGames" padding={0}>
      <Center padding={4} justifyContent="space-between" gap={2}>
        <Heading variant="game">{title}</Heading>

        <HStack spacing={4}>
          <IconButton
            onClick={arrow.onClick}
            aria-label={`arrow-${arrow.isChecked}`}
            icon={
              <Icon
                as={Chevron01Icon as any}
                width={6}
                height={6}
                color="primary.a.500"
                transitionDuration="slower"
                transform={arrow.isChecked ? 'rotate(-180deg)' : undefined}
              />
            }
          />

          {close ? (
            <IconButton
              onClick={close.onClick}
              aria-label={`arrow-${arrow.isChecked}`}
              icon={
                <Icon
                  as={CloseIcon as any}
                  width={6}
                  height={6}
                  color="shader.a.900"
                />
              }
            />
          ) : null}
        </HStack>
      </Center>

      <ChakraBox
        overflow="hidden"
        animate={{
          height: arrow.isChecked ? undefined : 0,
        }}
        sx={{
          '> div': {
            borderTop: '0.0625rem solid',
            borderColor: 'shader.a.300',
            padding: 4,
          },
        }}
      >
        {children}
      </ChakraBox>
    </CardBox>
  );
}
