import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';

const CardBody = (props: BoxProps): JSX.Element => {
  const { children, ...rest } = props;
  const styles = useStyleConfig('CardBody');
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default CardBody;
