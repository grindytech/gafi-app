import {
  Center,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import React, { useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface NewGamesTitleProps {
  register: UseFormRegister<FieldValues>;
}

export default function NewGamesTitle({ register }: NewGamesTitleProps) {
  const placeholder = '....';
  const maxiumLength = 28;
  const [text, setText] = useState(placeholder);

  return (
    <CardBox as={Center} variant="createGames" justifyContent="space-between">
      <Heading as="h6">Tittle</Heading>

      <Center>
        <InputGroup size="sm">
          <Input
            placeholder={placeholder}
            borderColor="shader.a.300"
            fontSize="sm"
            fontWeight="medium"
            color="shader.a.900"
            {...register('title')}
            value={text}
            maxLength={maxiumLength}
            onChange={e => setText(e.target.value)}
            _placeholder={{
              fontWeight: 'inherit',
              color: 'inherit',
            }}
            _focusVisible={{}}
          />

          <InputRightAddon bg="transparent">
            <Text as="span" color="shader.a.500" fontSize="sm">
              {text.length}/{maxiumLength}
            </Text>
          </InputRightAddon>
        </InputGroup>
      </Center>
    </CardBox>
  );
}
