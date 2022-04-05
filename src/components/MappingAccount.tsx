import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { mdiArrowLeftRight } from '@mdi/js';
import { u8aToHex } from '@polkadot/util';
import React, { useState } from 'react';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';

import { useSubstrateState } from '../substrate-lib';

import { getFromAcct } from './utils';

function MappingAccount() {
  const { account, connect, isConnected, reset, ethereum } = useWallet();
  const [status, setStatus] = useState('');
  const { api, currentAccount } = useSubstrateState();
  const [isWithdraw, setIsWithdraw] = useState(true);

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
      const data = u8aToHex(currentAccount.publicKey, undefined, false);
      const signature = await web3.eth.personal.sign(
        `Bond Aurora Network account:${data.toString()}`,
        account,
        ''
      );

      const txExecute = api.tx.txHandler.bond(signature, account, isWithdraw);

      const unsub = await txExecute
        .signAndSend(...fromAcct, txResHandler)
        .catch(txErrHandler);
    }
  };

  return (
    <Box>
      <Text fontWeight="bold" fontSize="2xl" mb={5}>
        Mapping Account
      </Text>
      <VStack width="full" gap={2}>
        <FormControl>
          <Checkbox
            checked={isWithdraw}
            defaultChecked={isWithdraw}
            onChange={event => setIsWithdraw(event.target.checked)}
          >
            Withdraw
          </Checkbox>
        </FormControl>
        <HStack gap={2} width="full">
          <VStack width="full">
            {isConnected() && (
              <FormControl>
                <FormLabel htmlFor="metamask">Metamask Address</FormLabel>
                <Input id="metamask" type="text" value={account || ''} />
              </FormControl>
            )}
            {isConnected() ? (
              <Button onClick={() => reset()}>Disconnect Metamask</Button>
            ) : (
              <Button onClick={() => connect('injected')}>
                Connect Metamask
              </Button>
            )}
          </VStack>
          <Box alignSelf="center">
            <Icon color="black" width="30px" height="30px">
              <path fill="currentColor" d={mdiArrowLeftRight} />
            </Icon>
          </Box>
          <VStack width="full" alignSelf="flex-start">
            <FormControl>
              <FormLabel htmlFor="polkadot">Polkadot Address</FormLabel>
              <Input
                id="polkadot"
                type="text"
                value={currentAccount?.address || ''}
              />
            </FormControl>
          </VStack>
        </HStack>
        <Button onClick={onWithdraw}>Map</Button>
        <Text>{status}</Text>
      </VStack>
    </Box>
  );
}

export default MappingAccount;
