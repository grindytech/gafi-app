import {
  HStack,
  InputGroup,
  InputRightAddon,
  NumberInput as ChakraNumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { t } from 'i18next';
import React from 'react';

import { cast } from 'utils/utils';

interface Props {
  value: string | number;
  onChange: (value: string | number) => void;
  max: number;
}

const NumberInput: React.FC<Props> = ({ value, onChange, max }) => (
  <HStack>
    <InputGroup size="lg">
      <ChakraNumberInput
        width="100%"
        keepWithinRange
        precision={3}
        min={0}
        value={value}
        onChange={valueAsString => {
          if (!valueAsString) {
            onChange(0);
            return;
          }
          onChange(valueAsString);
        }}
        onBlur={e => {
          const value = cast(e.target.value, 1, 3);
          const maxValue = Number(cast(max.toString(), 1, 3));
          if (value) {
            Number(value) > maxValue
              ? onChange(maxValue)
              : onChange(Number(value));
          }
        }}
        clampValueOnBlur={false}
      >
        <NumberInputField paddingX="4" />
      </ChakraNumberInput>
      <InputRightAddon
        cursor="pointer"
        _hover={{
          opacity: 0.8,
        }}
        bg="primary"
        color="white"
        fontSize="md"
        fontWeight="bold"
        onClick={() => onChange(Number(cast(max.toString(), 1, 4)))}
        textTransform="uppercase"
      >
        {t('MAX')}
      </InputRightAddon>
    </InputGroup>
  </HStack>
);

export default NumberInput;
