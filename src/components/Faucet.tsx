import { Box, Button, Icon, useToast } from '@chakra-ui/react';
import { mdiWaterPump } from '@mdi/js';
import React, { useState } from 'react';

import { useSubstrateState } from '../substrate-lib';

import { getFromAcct } from './utils';

const Faucet = () => {
  const { api, currentAccount } = useSubstrateState();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // @ts-ignore
  const txResHandler = ({ status }) => {
    status.isFinalized
      ? toast({
          description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
          isClosable: true,
          status: 'success',
          position: 'top-right',
        })
      : toast({
          description: `Current transaction status: ${status.type}`,
          isClosable: true,
          status: 'info',
          position: 'top-right',
        });
    setIsLoading(false);
  };

  // @ts-ignore
  const txErrHandler = err => {
    toast({
      description: `😞 Transaction Failed: ${err.toString()}`,
      isClosable: true,
      status: 'error',
      position: 'top-right',
    });
    setIsLoading(false);
  };

  const onFaucet = async () => {
    setIsLoading(true);
    if (currentAccount) {
      const fromAcct = await getFromAcct(currentAccount);
      const txExecute = api.tx.faucet.faucet();

      await txExecute
        .signAndSend(...fromAcct, txResHandler)
        .catch(txErrHandler);
    }
  };

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
      <Button
        width="full"
        onClick={onFaucet}
        isLoading={isLoading}
        leftIcon={
          <Icon>
            <path d={mdiWaterPump} />
          </Icon>
        }
      >
        Faucet
      </Button>
    </Box>
  );
};

export default Faucet;
