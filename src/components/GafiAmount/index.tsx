import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

interface GafiAmountProps {
  amount: number | string;
  sx?: TextProps;
}

export default function GafiAmount({ amount, ...props }: GafiAmountProps) {
  return (
    <Text fontSize="md" fontWeight="semibold" color="shader.a.900" {...props}>
      {amount}&nbsp;
      <Text as="span" color="primary.a.500" fontSize="xs" fontWeight="semibold">
        GAFI
      </Text>
    </Text>
  );
}
