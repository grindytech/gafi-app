import {
  Box,
  BoxProps,
  Button,
  CloseButton,
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
  VStack,
} from '@chakra-ui/react';
import { mdiSwapVerticalBold } from '@mdi/js';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';

import Card from 'components/card/Card';
import { acctAddr, shorten } from 'components/utils';
import { useSubstrate } from 'contexts/substrateContext';
import useFaucet from 'hooks/useFaucet';
import useLoadCurrentAccount from 'hooks/useLoadCurrentAccount';
import useMessageToast from 'hooks/useMessageToast';
import { usePolkadotBalance } from 'hooks/useUserBalance';

const CHROME_EXT_URL =
  'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd';
const FIREFOX_ADDON_URL =
  'https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/';

interface IProps extends BoxProps {
  onClose?: () => void;
}
const AccountInfo = ({ display, onClose }: IProps) => {
  const theme = useTheme();
  const { copySuccessToast } = useMessageToast();
  const { t } = useTranslation();
  const { account, connect, isConnected, reset } = useWallet();
  const { hanldeSwitchAccount, state } = useSubstrate();
  const { currentAccount, polkadotAccounts } = state;
  const { polkadotFormatedBalance } = usePolkadotBalance();
  const { pairs } = useLoadCurrentAccount();
  const { faucet, isLoading } = useFaucet();

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
        <CloseButton display={{ base: 'flex', pc: 'none' }} onClick={onClose} />
      </Box>

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
                    <MenuButton
                      sx={{
                        '&:hover': { opacity: 0.8 },
                      }}
                      ml={2}
                    >
                      <Icon color="primary">
                        <path fill="currentColor" d={mdiSwapVerticalBold} />
                      </Icon>
                    </MenuButton>
                    <MenuList
                      sx={{
                        h: '200px',
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
                              key={polkadotAccount}
                              onClick={() => {
                                hanldeSwitchAccount(pairs[index]);
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
                <Text textAlign="center" sx={balanceStyled}>
                  {polkadotFormatedBalance}
                </Text>
                <Button
                  onClick={faucet}
                  isLoading={isLoading}
                  sx={faucetButtonStyled}
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
  w: { base: 'full', pc: 72, '2xl': '20vw' },
  minHeight: '470px',
  alignItems: 'center',
  bg: 'white',
  justifyContent: 'flex-start',
};

const titleStyled = {
  fontSize: 'xs',
  fontWeight: 'bold',
  color: 'greyTitle',
  textTransform: 'uppercase',
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
