import { Box } from '@chakra-ui/react';
import Identicon from '@polkadot/react-identicon';
import { IdentityProps } from '@polkadot/react-identicon/types';

export default (props: IdentityProps) => {
  /* 
    but you cannot using variable as chakra 
    Ex: borderRadius: "full" // cannot so should '100%'
  */
  return (
    <Box
      as={Identicon}
      size={40}
      theme="substrate"
      overflow="hidden"
      pointerEvents="none" // this prevent onCopy
      {...props}
    />
  );
};
