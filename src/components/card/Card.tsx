import { Box, BoxProps, useStyleConfig, ThemingProps } from '@chakra-ui/react';
import { FC } from 'react';

interface CardProps extends BoxProps, ThemingProps<'div'> {}

const Card: FC<CardProps> = props => {
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig('Card', { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
};

export default Card;
