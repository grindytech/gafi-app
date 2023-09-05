import { Box, BoxProps } from '@chakra-ui/react';

interface JohnEmptyProps {
  sx?: BoxProps;
}

export default ({ sx }: JohnEmptyProps) => {
  return (
    <Box color="shader.a.600" {...sx}>
      Empty
    </Box>
  );
};
