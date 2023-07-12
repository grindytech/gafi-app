import { Button, Icon } from '@chakra-ui/react';

import Chevron02Icon from 'public/assets/line/chevron-02.svg';
import { Link } from 'react-router-dom';

export default function GoBack() {
  return (
    <Button
      as={Link}
      to="/web3"
      variant="unstyled"
      display="inline-flex"
      height="auto"
      minWidth="auto"
      color="shader.a.900"
      fontSize="sm"
      fontWeight="semibold"
      iconSpacing={1}
      leftIcon={
        <Icon as={Chevron02Icon} width={5} height={5} color="primary.a.500" />
      }
    >
      Go back
    </Button>
  );
}
