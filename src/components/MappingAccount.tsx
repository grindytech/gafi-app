import { Box, Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';

import { useSubstrateState } from '../substrate-lib';

import { getFromAcct } from './utils';

function MappingAccount() {
  const { account, connect, isConnected, reset, ethereum } = useWallet();
  const [status, setStatus] = useState('');
  const { api, currentAccount } = useSubstrateState();

  // @ts-ignore
  const txResHandler = ({ status }) =>
    status.isFinalized
      ? setStatus(`😉 Finalized. Block hash: ${status.asFinalized.toString()}`)
      : setStatus(`Current transaction status: ${status.type}`);

  // @ts-ignore
  const txErrHandler = err =>
    setStatus(`😞 Transaction Failed: ${err.toString()}`);

  const onWithdraw = async () => {
    if (account && ethereum) {
      const fromAcct = await getFromAcct(currentAccount);
      const web3 = new Web3(ethereum);
      const buffer = currentAccount?.publicKey.buffer;
      const data = Array.prototype.map
        .call(new Uint8Array(buffer), x => `00${x.toString(16)}`.slice(-2))
        .join('');
      const signature = await web3.eth.personal.sign(
        `Bond Aurora Network account:${data}`,
        account,
        ''
      );

      const txExecute = api.tx.txHandler.bond(signature, account, true);

      const unsub = await txExecute
        .signAndSend(...fromAcct, txResHandler)
        .catch(txErrHandler);
    }
  };

  return (
    <Box>
      MappingAccount
      <VStack width="full" gap={2}>
        <HStack gap={2} width="full">
          <VStack width="full">
            {isConnected() ? (
              <Button onClick={() => reset()}>
                Disconnect Metamask wallet
              </Button>
            ) : (
              <Button onClick={() => connect('injected')}>
                Connect Metamask wallet
              </Button>
            )}
            <Input value={account || ''} />
          </VStack>
          <VStack width="full">
            {currentAccount ? (
              <Button onClick={() => reset()}>
                Disconnect Polkadot wallet
              </Button>
            ) : (
              <Button onClick={() => connect('injected')}>
                Connect Polkadot wallet
              </Button>
            )}
            <Input value={currentAccount?.address || ''} />
          </VStack>
        </HStack>
        <Button onClick={onWithdraw}>Withdraw</Button>
        <Text>{status}</Text>
      </VStack>
    </Box>
  );
}

export default MappingAccount;
