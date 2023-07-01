import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

interface FormControlWrapProps extends BoxProps {
  variant?: string;
}

export default function FormControlWrap({
  variant,
  children,
  ...rest
}: FormControlWrapProps) {
  const styles = useStyleConfig('FormControl', { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}
