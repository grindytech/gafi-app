import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
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
  useTheme,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { mdiSwapVerticalBold } from '@mdi/js';
import { KeyringPair } from '@polkadot/keyring/types';
import { ISubmittableResult } from '@polkadot/types/types';
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
import { useSubstrate } from 'contexts/substrateContext';
import useMessageToast from 'hooks/useMessageToast';
import { usePolkadotBalance } from 'hooks/useUserBalance';

const CHROME_EXT_URL =
  'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd';
const FIREFOX_ADDON_URL =
  'https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/';

const AccountInfo = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const { copySuccessToast } = useMessageToast();
  const { t } = useTranslation();
  const { account, connect, isConnected, reset } = useWallet();
  const {
    setCurrentAccount,
    state: { keyring, currentAccount, api, polkadotAccounts },
  } = useSubstrate();

  const { polkadotFormatedBalance } = usePolkadotBalance();
  const pairs = keyring?.getPairs() || [];

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

  useEffect(() => {
    if (!currentAccount) setPolkadotAccount();
  }, [setPolkadotAccount]);

  const hanldeSwitchAccount = (index: number) => {
    try {
      setCurrentAccount(pairs[index]);
      toast({
        title: t('SWITCH_ACCOUNT_SUCCESSFUL'),
        description: acctAddr(pairs[index]),
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

  const txResHandler = ({ status, events }: ISubmittableResult) => {
    if (status.isFinalized) {
      handleTxError(events, api, toast);
      toast({
        title: t('FINALIZED_BLOCK_HASH'),
        description: status.asFinalized.toString(),
        isClosable: true,
        status: 'success',
      });
      setIsLoading(false);
    } else {
      toast({
        title: t('CURRENT_TRANSACTION_STATUS'),
        description: status.type,
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
        <TabList justifyContent="space-evenly">
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
            {currentAccount ? (
              <>
                <Flex mb={4} w="full" alignItems="center">
                  <CopyToClipboard text={acctAddr(currentAccount)}>
                    <Button
                      flex={10}
                      justifyContent="center"
                      w="full"
                      px={0}
                      variant="outline"
                      onClick={copySuccessToast}
                    >
                      {shorten(acctAddr(currentAccount))}
                    </Button>
                  </CopyToClipboard>

                  <Menu>
                    <MenuButton sx={menuBtn} ml={2}>
                      <Flex
                        className="switch-btn"
                        sx={switchBtn}
                        border={`3px solid ${theme.colors.primary}`}
                      >
                        <Icon color="primary">
                          <path fill="currentColor" d={mdiSwapVerticalBold} />
                        </Icon>
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      <MenuOptionGroup
                        defaultValue={acctAddr(currentAccount)}
                        type="radio"
                      >
                        {polkadotAccounts?.map(
                          (polkadotAccount: string, index: number) => (
                            <MenuItemOption
                              key={polkadotAccount}
                              onClick={() => {
                                hanldeSwitchAccount(index);
                              }}
                              value={polkadotAccount}
                            >
                              {shorten(polkadotAccount)}
                            </MenuItemOption>
                          )
                        )}
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                </Flex>
                <Box sx={balanceStyled}>
                  <Text sx={balanceTextStyled}>{polkadotFormatedBalance}</Text>
                  <Text color="primary" pl={2} pb={2}>
                    {t('GAKI')}
                  </Text>
                </Box>

                <Button
                  onClick={onFaucet}
                  isLoading={isLoading}
                  sx={faucetButtonStyled}
                  variant="primary"
                >
                  {t('FAUCET')}
                </Button>
              </>
            ) : (
              <Text>
                Create an account with Polkadot-JS Extension (
                <Link
                  color="primary"
                  target="_blank"
                  rel="noreferrer"
                  href={CHROME_EXT_URL}
                >
                  Chrome
                </Link>
                ,&nbsp;
                <Link
                  color="primary"
                  target="_blank"
                  rel="noreferrer"
                  href={FIREFOX_ADDON_URL}
                >
                  Firefox
                </Link>
                )&nbsp;
              </Text>
            )}
          </TabPanel>
          <TabPanel>
            {isConnected() ? (
              account && (
                <VStack spacing={6}>
                  <CopyToClipboard text={account.toString()}>
                    <Button
                      w="full"
                      variant="outline"
                      justifyContent="center"
                      onClick={copySuccessToast}
                    >
                      {shorten(account.toString())}
                    </Button>
                  </CopyToClipboard>
                  <Button variant="primary" onClick={() => reset()}>
                    {t('DISCONNECT_METAMASK')}
                  </Button>
                </VStack>
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
  fontSize: 'xs',
  fontWeight: 'bold',
  mb: 10,
  color: 'greyTitle',
  alignSelf: 'flex-start',
  textTransform: 'uppercase',
};

const balanceTextStyled = {
  color: 'primary',
  fontWeight: 'bold',
  fontSize: '4xl',
};

const balanceStyled = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  mt: 16,
  mb: 10,
};

const faucetButtonStyled = {
  mt: 22,
  width: '100%',
};

const switchBtn = {
  borderRadius: '50%',
  w: 8,
  h: 8,
  justifyContent: 'center',
  alignItems: 'center',
};

const menuBtn = {
  '&:hover .chakra-icon': { color: 'white' },
  '&:hover .switch-btn': { bg: 'primary' },
};
