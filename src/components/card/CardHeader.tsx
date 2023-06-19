import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const CardHeader = (props: BoxProps): JSX.Element => {
  const { children, ...rest } = props;
  const styles = useStyleConfig('CardHeader');
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default CardHeader;
