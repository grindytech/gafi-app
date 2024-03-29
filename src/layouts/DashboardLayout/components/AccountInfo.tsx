import {
  Box,
  BoxProps,
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
} from '@chakra-ui/react';
import { mdiChevronDown, mdiSwapVerticalBold } from '@mdi/js';
import { useLocalStorage } from '@rehooks/local-storage';
import { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';

import Card from 'components/card/Card';
import { useConnectWallet } from 'contexts/connectWalletContext/connectWalletContext';
import { useSubstrate } from 'contexts/substrateContext';
import useAnalyticsEventTracker from 'hooks/useAnalyticsEventTracker';
import useFaucet from 'hooks/useFaucet';
import useLoadCurrentAccount from 'hooks/useLoadCurrentAccount';
import useMessageToast from 'hooks/useMessageToast';
import { usePolkadotBalance } from 'hooks/useUserBalance';
import { acctAddr, shorten } from 'utils';
import {
  CHROME_EXT_URL,
  FIREFOX_ADDON_URL,
  GAFI_WALLET_STORAGE_KEY,
  wallets,
} from 'utils/constants';

interface IProps extends BoxProps {
  onClose?: () => void;
}
const AccountInfo = ({ display, onClose }: IProps) => {
  const { reset } = useWallet();
  const { copySuccessToast } = useMessageToast();
  const { t } = useTranslation();
  const { account, connect, isConnected } = useWallet();
  const { hanldeSwitchAccount, state } = useSubstrate();
  const { currentAccount, polkadotAccounts } = state;
  const { polkadotFormatedBalance } = usePolkadotBalance();
  const { pairs } = useLoadCurrentAccount();
  const { faucet, isLoading } = useFaucet();
  const theme = useTheme();
  const gaEventTracker = useAnalyticsEventTracker('Account info');
  const [selectedWallet, setSelectedWallet] = useState(wallets[0]);
  const { onOpen } = useConnectWallet();

  const [extensionName] = useLocalStorage(GAFI_WALLET_STORAGE_KEY);

  useEffect(() => {
    if (extensionName) {
      const founded = wallets.find(
        item => item.extensionName === extensionName
      );
      if (founded) {
        setSelectedWallet(founded);
      }
    }
  }, [extensionName]);

  return (
    <Card sx={AccountInfoStyled} display={display}>
      <Box
        display="flex"
        mb={10}
        alignItems="center"
        justifyContent="space-between"
        w="full"
      >
        <Text sx={titleStyled}>{t('YOUR_BALANCE')}</Text>
        <Box
          display={{ base: 'flex', lg: 'none' }}
          onClick={onClose}
          w={10}
          h={10}
        >
          <Icon color="primary" w={10} h={10}>
            <path fill="currentColor" d={mdiChevronDown} />
          </Icon>
        </Box>
      </Box>

      <Tabs variant="soft-rounded">
        <TabList
          sx={{
            justifyContent: 'space-evenly',
          }}
        >
          <Tab>
            <Image
              onClick={onOpen}
              w={5}
              h={5}
              src={selectedWallet.icon}
              mr={2}
            />
            {t(selectedWallet.title)}
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
                      onClick={() => {
                        gaEventTracker({ action: 'Copy wallet address' });
                        copySuccessToast();
                      }}
                    >
                      {shorten(acctAddr(currentAccount))}
                    </Button>
                  </CopyToClipboard>

                  <Menu>
                    <MenuButton data-testid="switch-btn" sx={menuBtn} ml={2}>
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
                    <MenuList
                      sx={{
                        maxHeight: {
                          base: '200px',
                          md: '300px',
                          lg: '600px',
                        },
                        overflowY: 'scroll',
                      }}
                    >
                      <MenuOptionGroup
                        defaultValue={acctAddr(currentAccount)}
                        type="radio"
                      >
                        {polkadotAccounts?.map(
                          (polkadotAccount: string, index: number) => (
                            <MenuItemOption
                              data-testid={`swich-account-btn-${index}`}
                              key={polkadotAccount}
                              onClick={() =>
                                polkadotAccount === currentAccount.address
                                  ? null
                                  : hanldeSwitchAccount(pairs[index])
                              }
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
                  onClick={() => {
                    gaEventTracker({ action: 'Faucet' });
                    faucet();
                  }}
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
                <>
                  <CopyToClipboard text={account.toString()}>
                    <Button
                      w="full"
                      variant="outline"
                      justifyContent="center"
                      onClick={() => {
                        gaEventTracker({ action: 'Copy Metamask address' });
                        copySuccessToast();
                      }}
                    >
                      {shorten(account.toString())}
                    </Button>
                  </CopyToClipboard>
                  <Button w="full" mt={4} variant="primary" onClick={reset}>
                    {t('DISCONNECT_METAMASK')}
                  </Button>
                </>
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
  w: { base: 'full', lg: 72, '2xl': '20vw' },
  minHeight: { base: '470px', lg: 0 },
  alignItems: 'center',
  bg: 'white',
  justifyContent: 'flex-start',
  borderRadius: { base: '24px 24px 0 0', lg: '2xl' },
};

const titleStyled = {
  fontSize: 'xs',
  fontWeight: 'bold',
  color: 'greyTitle',
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
