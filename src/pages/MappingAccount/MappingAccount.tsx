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
  Image,
  Switch,
} from '@chakra-ui/react';
import { mdiArrowLeftRight, mdiContentCopy } from '@mdi/js';
import { u8aToHex } from '@polkadot/util';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';
import Web3 from 'web3';

import Banner from 'components/Banner';
import Card from 'components/card/Card';
import featureFlag from 'components/FeatureFlags';
import { getFromAcct, handleTxError, shorten } from 'components/utils';
import { useSubstrateState } from 'contexts/substrateContext';
import useMessageToast from 'hooks/useMessageToast';

function MappingAccount() {
  const toast = useToast();
  const { t } = useTranslation();
  const { account, connect, isConnected, reset, ethereum } = useWallet();
  const { api, currentAccount } = useSubstrateState();
  const [isWithdraw, setIsWithdraw] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { copySuccessToast } = useMessageToast();

  // @ts-ignore
  const txResHandler = ({ status, events }) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        description: t('FINALIZED_BLOCK_HASH', {
          hash: status.asFinalized.toString(),
        }),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
    } else {
      toast({
        description: t('CURRENT_TRANSACTION_STATUS', {
          statusType: status.type,
        }),
        isClosable: true,
        status: 'info',
      });
    }
  };

  // @ts-ignore
  const txErrHandler = err => {
    toast({
      description: t('TRANSACTION_FAILED', {
        errorMessage: err.toString(),
      }),
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
      const data = u8aToHex(currentAccount?.publicKey, undefined, false);
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
    <>
      {featureFlag.isDisplayNewDashboardUI ? (
        <>
          <Banner
            title={t('MAPPING_ACCOUNT')}
            subTitle={t('MAPPING_ACCOUNT_DESCRIPTION')}
            bannerBg="/assets/layout/mapping-account-banner.png"
            btnLink="https://wiki.gafi.network/learn/proof-address-mapping"
          />
          <Card>
            <VStack width="full" gap={2}>
              <HStack alignItems="flex-start" gap={2} width="full">
                <Card
                  border="2px solid #EEF1FF"
                  boxShadow="none"
                  py={12}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <HStack mb={6}>
                    <Text>{t('METAMASK_ADDRESS')}</Text>
                    <Box>
                      <Image src="/assets/layout/metamask.png" />
                    </Box>
                  </HStack>
                  {isConnected() ? (
                    account && (
                      <>
                        <CopyToClipboard text={account.toString()}>
                          <Button
                            mb={4}
                            variant="ghost"
                            onClick={copySuccessToast}
                            w="full"
                            rightIcon={
                              <Icon color="primary">
                                <path fill="currentColor" d={mdiContentCopy} />
                              </Icon>
                            }
                          >
                            {shorten(account.toString())}
                          </Button>
                        </CopyToClipboard>
                        <Button
                          mt={6}
                          variant="primary"
                          onClick={() => reset()}
                        >
                          {t('DISCONNECT_METAMASK')}
                        </Button>
                      </>
                    )
                  ) : (
                    <Button
                      mb={4}
                      variant="ghost"
                      w="full"
                      onClick={() => connect('injected')}
                    >
                      {t('CONNECT_METAMASK')}
                    </Button>
                  )}
                </Card>
                <Card
                  border="2px solid #EEF1FF"
                  boxShadow="none"
                  py={12}
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <HStack mb={6}>
                    <Text>{t('POLKADOT_ADDRESS')}</Text>
                    <Box>
                      <Image src="/assets/layout/polkadot.png" />
                    </Box>
                  </HStack>
                  {currentAccount && (
                    <CopyToClipboard text={currentAccount.address.toString()}>
                      <Button
                        mb={4}
                        variant="ghost"
                        w="full"
                        onClick={copySuccessToast}
                        rightIcon={
                          <Icon color="primary">
                            <path fill="currentColor" d={mdiContentCopy} />
                          </Icon>
                        }
                      >
                        {shorten(currentAccount.address.toString())}
                      </Button>
                    </CopyToClipboard>
                  )}
                </Card>
              </HStack>
              <FormControl
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Switch
                  checked={isWithdraw}
                  defaultChecked
                  onChange={event => setIsWithdraw(event.target.checked)}
                  size="md"
                  id="isWithdraw"
                />
                <FormLabel htmlFor="isWithdraw" ml={4} mb={0}>
                  {t('WITHDRAW')}
                </FormLabel>
              </FormControl>
              <Button px={20} onClick={onWithdraw} isLoading={isLoading}>
                {t('MAPPING')}
              </Button>
            </VStack>
          </Card>
        </>
      ) : (
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
      )}
    </>
  );
}

export default MappingAccount;
