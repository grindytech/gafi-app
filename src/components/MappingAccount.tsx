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
  useToast,
  VStack,
} from '@chakra-ui/react';
import { mdiArrowLeftRight } from '@mdi/js';
import { u8aToHex } from '@polkadot/util';
import React, { useState } from 'react';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';

import { useSubstrateState } from '../substrate-lib';

import { getFromAcct, handleTxError } from './utils';

function MappingAccount() {
  const toast = useToast();
  const { account, connect, isConnected, reset, ethereum } = useWallet();
  const { api, currentAccount } = useSubstrateState();
  const [isWithdraw, setIsWithdraw] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // @ts-ignore
  const txResHandler = ({ status, events }) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: `😉 Finalized. Block hash: ${status.asFinalized.toString()}`,
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
    } else {
      toast({
        description: `Current transaction status: ${status.type}`,
        isClosable: true,
        status: 'info',
      });
    }
  };

  // @ts-ignore
  const txErrHandler = err => {
    toast({
      description: `😞 Transaction Failed: ${err.toString()}`,
      isClosable: true,
      status: 'error',
    });
    setIsLoading(false);
  };

  const onWithdraw = async () => {
    setIsLoading(true);
    if (account && ethereum) {
      const [accountAddress, options] = await getFromAcct(currentAccount);
      const web3 = new Web3(ethereum);
      const data = u8aToHex(currentAccount.publicKey, undefined, false);
      const signature = await web3.eth.personal.sign(
        `Bond Gafi Network account:${data.toString()}`,
        account,
        ''
      );
      if (api) {
        const txExecute = api.tx.proofAddressMapping.bond(
          signature,
          account,
          isWithdraw
        );

        if (options) {
          const unsub = await txExecute
            .signAndSend(accountAddress, options, txResHandler)
            .catch(txErrHandler);
        } else {
          const unsub = await txExecute
            .signAndSend(accountAddress, txResHandler)
            .catch(txErrHandler);
        }
      }
    }
  };

  return (
    <Box pt={{ base: '120px', md: '75px' }}>
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
        <Button onClick={onWithdraw} isLoading={isLoading}>
          Map
        </Button>
      </VStack>
    </Box>
  );
}

export default MappingAccount;
