import {
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  value: string | number;
  onChange: (value: string | number) => void;
  max: number;
  inputName?: string;
}

const NumberInput: React.FC<Props> = ({ value, onChange, max, inputName }) => {
  const { t } = useTranslation();
  return (
    <HStack spacing={0}>
      <InputGroup overflow="hidden">
        <Input
          name={inputName}
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
          <Text textTransform="uppercase" fontWeight={700}>
            {t('MAX')}
          </Text>
        </InputRightAddon>
      </InputGroup>
    </HStack>
  );
};

export default NumberInput;
