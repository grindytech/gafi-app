import {
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import { mdiSwapVerticalBold } from '@mdi/js';
import { KeyringPair } from '@polkadot/keyring/types';
import { useCallback, useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';

import Card from 'components/card/Card';
import {
  acctAddr,
  getFromAcct,
  getGAKIAccountAddress,
  handleTxError,
  shorten,
} from 'components/utils';
import useMessageToast from 'hooks/useMessageToast';
import { usePolkadotBalance } from 'hooks/useUserBalance';
import { useSubstrate } from 'substrate-lib';

const AccountInfo = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { CopySuccessToast } = useMessageToast();

  const { t } = useTranslation();
  const { account, connect, isConnected } = useWallet();
  const {
    setCurrentAccount,
    state: { keyring, currentAccount, api },
  } = useSubstrate();

  const { pokadotBalance } = usePolkadotBalance();
  const pairs = keyring?.getPairs() || [];
  const accountList = pairs.map((key: KeyringPair) => acctAddr(key));
  const setPolkadotAccount = useCallback(async () => {
    const response = await api?.query.proofAddressMapping.h160Mapping(account);
    const polkadotAccount = response?.toHuman() || '';
    const initPair = pairs.find(
      (pair: KeyringPair) =>
        getGAKIAccountAddress(pair.addressRaw) === polkadotAccount
    );

    if (initPair) {
      setCurrentAccount(initPair);
    } else if (pairs.length > 0) {
      setCurrentAccount(pairs[0]);
    }
  }, [account, api, keyring]);

  const hanldeSwitchAccount = (index: number) => {
    try {
      setCurrentAccount(pairs[index]);
      toast({
        description: t('SWITCH_TO_ACCOUNT_SUCCESSFUL', {
          accountAddress: acctAddr(pairs[index]),
        }),
        isClosable: true,
        status: 'success',
      });
    } catch (error) {
      toast({
        description: t('SWITCH_ACCOUNT_FAIL'),
        isClosable: true,
        status: 'error',
      });
    }
  };

  useEffect(() => {
    setPolkadotAccount();
  }, [setPolkadotAccount]);
  const txResHandler = ({ status, events }: any) => {
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

  const onFaucet = async () => {
    setIsLoading(true);
    if (currentAccount) {
      const [acc, options] = await getFromAcct(currentAccount);

      if (api) {
        const txExecute = api.tx.faucet.faucet();

        if (options) {
          const unsub = await txExecute
            .signAndSend(acc, options, txResHandler)
            .catch(txErrHandler);
        } else {
          const unsub = await txExecute
            .signAndSend(acc, txResHandler)
            .catch(txErrHandler);
        }
      }
    }
  };

  return (
    <Card sx={AccountInfoStyled}>
      <Text sx={titleStyled}>{t('YOUR_BALANCE')}</Text>

      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>
            <Image w={5} h={5} src="/assets/layout/polkadot.png" mr={2} />
            {t('POLKADOT')}
          </Tab>
          <Tab>
            <Image w={5} h={5} src="/assets/layout/metamask.png" mr={2} />
            {t('METAMASK')}
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {currentAccount && (
              <Flex mb={4} w="full" alignItems="center">
                <CopyToClipboard text={acctAddr(currentAccount)}>
                  <Button
                    flex={10}
                    justifyContent="center"
                    sx={{ width: '100%', px: 0 }}
                    variant="outline"
                    onClick={() => {
                      CopySuccessToast();
                    }}
                  >
                    {shorten(acctAddr(currentAccount))}
                  </Button>
                </CopyToClipboard>

                <Menu>
                  <MenuButton
                    sx={{
                      '&:hover': { opacity: 0.8 },
                    }}
                    ml={2}
                  >
                    <Icon color="primary" w={5} h={5}>
                      <path fill="currentColor" d={mdiSwapVerticalBold} />
                    </Icon>
                  </MenuButton>
                  <MenuList>
                    <MenuOptionGroup
                      defaultValue={acctAddr(currentAccount)}
                      type="radio"
                    >
                      {accountList?.map((account: string, index: number) => (
                        <MenuItemOption
                          key={account}
                          onClick={() => {
                            hanldeSwitchAccount(index);
                          }}
                          value={account}
                        >
                          {shorten(account)}
                        </MenuItemOption>
                      ))}
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </Flex>
            )}

            <Text textAlign="center" sx={balanceStyled}>
              {pokadotBalance}
            </Text>
            <Button
              mt={20}
              onClick={onFaucet}
              isLoading={isLoading}
              sx={faucetButtonStyled}
            >
              {t('FAUCET')}
            </Button>
          </TabPanel>
          <TabPanel>
            {isConnected() ? (
              account && (
                <CopyToClipboard text={account.toString()}>
                  <Button
                    sx={{ width: '100%' }}
                    variant="outline"
                    justifyContent="center"
                    onClick={() => {
                      CopySuccessToast();
                    }}
                  >
                    {shorten(account.toString())}
                  </Button>
                </CopyToClipboard>
              )
            ) : (
              <Button
                w="full"
                mb={4}
                variant="outline"
                onClick={() => connect('injected')}
              >
                {t('CONNECT_METAMASK')}
              </Button>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};

export default AccountInfo;

const AccountInfoStyled = {
  flex: 2,
  alignItems: 'center',
  bg: 'white',
  display: 'flex',
  justifyContent: 'flex-start',
};

const titleStyled = {
  fontSize: 'xl',
  fontWeight: 'medium',
  mb: 4,
  pt: 4,
};

const balanceStyled = {
  color: 'primary',
  fontWeight: 'bold',
  fontSize: '4xl',
  mt: 16,
};

const faucetButtonStyled = {
  mt: 22,
  width: '100%',
};
