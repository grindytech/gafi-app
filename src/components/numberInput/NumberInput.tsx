import { HStack, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  value: string | number;
  onChange: (value: string | number) => void;
  max: number;
}

const NumberInput: React.FC<Props> = ({ value, onChange, max }) => {
  const { t } = useTranslation();
  return (
    <HStack spacing={0}>
      <InputGroup overflow="hidden">
        <Input
          type="number"
          value={value}
          onChange={e => {
            if (parseFloat(e.target.value) > max) {
              onChange(Math.floor(max));
            } else {
              onChange(e.target.value);
            }
          }}
        />
        <InputRightAddon onClick={() => onChange(Math.floor(max))}>
          {t('MAX')}
        </InputRightAddon>
      </InputGroup>
    </HStack>
  );
};

export default NumberInput;
