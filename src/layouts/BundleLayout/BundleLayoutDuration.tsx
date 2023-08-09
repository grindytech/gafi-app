import { Box, Stack, Text } from '@chakra-ui/react';
import CardBox from 'components/CardBox';
import DateBlock from 'components/DateBlock';
import GafiAmount from 'components/GafiAmount';
import { PropsWithChildren } from 'react';
import { formatCurrency } from 'utils/utils';

interface BundleLayoutDurationProps extends PropsWithChildren {
  maybePrice: string;
  duration: {
    heading: string;
    endBlock: number;
  };
}

export default function BundleLayoutDuration({
  maybePrice,
  duration,
  children,
}: BundleLayoutDurationProps) {
  return (
    <CardBox variant="baseStyle" padding={0} fontSize="sm" color="shader.a.500">
      <Text
        borderBottom="0.0625rem solid"
        borderColor="shader.a.200"
        px={6}
        py={4}
      >
        {duration.heading}&nbsp;
        <DateBlock
          endBlock={duration.endBlock}
          sx={{
            as: 'span',
            fontWeight: 'medium',
            color: 'shader.a.900',
          }}
        />
      </Text>

      <Stack spacing={6} padding={6}>
        <Box
          borderRadius="xl"
          border="0.0625rem solid"
          borderColor="shader.a.300"
          bg="shader.a.200"
          padding={4}
        >
          <GafiAmount
            amount={maybePrice}
            sx={{
              sx: {
                '&, span': {
                  fontSize: 'xl',
                  color: 'shader.a.900',
                  fontWeight: 'semibold',
                },
              },
            }}
          />

          <Text as="strong" fontWeight="normal">
            {formatCurrency(Number(maybePrice), 'usd')}
          </Text>
        </Box>

        {children}
      </Stack>
    </CardBox>
  );
}
