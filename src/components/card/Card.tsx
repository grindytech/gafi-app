import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';
import { FC } from 'react';

const Card: FC<BoxProps> = props => {
  // @ts-ignore
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('Card', { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
