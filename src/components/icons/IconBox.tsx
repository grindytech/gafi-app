import { Flex, FlexProps } from '@chakra-ui/react';
import { FC } from 'react';

const IconBox: FC<FlexProps> = props => {
  const { children, ...rest } = props;

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      borderRadius="12px"
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default IconBox;
