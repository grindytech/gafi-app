// Chakra Icons
// import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { mdiAccount, mdiWallet } from '@mdi/js';
import { KeyringPair } from '@polkadot/keyring/types';
import { SubjectInfo } from '@polkadot/ui-keyring/observable/types';
import { BN, formatBalance } from '@polkadot/util';
import { FC, useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import routes from '../../routes';
import { useSubstrate } from '../../substrate-lib';
import { SidebarResponsive } from '../sideBar/SideBar';
import { shorten } from '../utils';
import UserMenu from './UserMenu';

interface IProps {
  variant?: string;
  fixed: boolean;
  secondary: boolean;
  onOpen: () => void;
  logoText: string;
}

export const acctAddr = (acct: KeyringPair) => (acct ? acct.address : '');

const AdminNavbarLinks: FC<IProps> = props => {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const {
    setCurrentAccount,
    state: { keyring, currentAccount, api, chainDecimal },
  } = useSubstrate();
  const AccountsObjects = keyring?.accounts.subject.value as SubjectInfo;
  const accountList = Object.keys(AccountsObjects);
  const [accountBalance, setAccountBalance] = useState(new BN(0));
  const { t } = useTranslation();
  const toast = useToast();

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe: any;

    // If the user has selected an address, create a new subscription
    currentAccount &&
      api?.query.system
        .account(acctAddr(currentAccount), (balance: any) => {
          setAccountBalance(balance.data.free);
        })
        .then(unsub => (unsubscribe = unsub))
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, currentAccount]);

  // Get the list of accounts we possess the private key for
  // Temporary use any. Define type later
  const keyringOptions = keyring?.getPairs().map((account: any) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: 'user',
  }));

  const initialAddress =
    keyringOptions && keyringOptions.length > 0 ? keyringOptions[0].value : '';

  // Set the initial address
  useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    if (!currentAccount && keyring && initialAddress.length > 0) {
      setCurrentAccount(keyring.getPair(initialAddress));
    }
  }, [currentAccount, setCurrentAccount, keyring, initialAddress]);

  const hanldeSwitchAccount = (index: number) => {
    const keyringParams =
      keyringOptions && keyringOptions.length > index
        ? keyringOptions[index].value
        : '';
    if (keyring && keyringParams !== '') {
      setCurrentAccount(keyring.getPair(keyringParams));
      toast({
        description: t('SWITCH_TO_ACCOUNT_SUCCESSFUL', {
          accountAddress: keyringParams,
        }),
        isClosable: true,
        status: 'success',
      });
    } else {
      toast({
        description: t('SWITCH_ACCOUNT_FAIL'),
        isClosable: true,
        status: 'error',
      });
    }
  };
  // Chakra Color Mode
  const mainTeal = useColorModeValue('teal.300', 'teal.300');
  const inputBg = useColorModeValue('white', 'gray.800');
  let mainText = useColorModeValue('gray.700', 'gray.200');
  let navbarIcon = useColorModeValue('gray.500', 'gray.200');
  const searchIcon = useColorModeValue('gray.700', 'gray.200');

  if (secondary) {
    navbarIcon = 'white';
    mainText = 'white';
  }
  const settingsRef = useRef(null);
  return (
    <Flex
      pe={{ sm: '0px', md: '16px' }}
      w={{ sm: '100%', md: 'auto' }}
      gap={1}
      flexDirection="row"
    >
      {currentAccount ? (
        <VStack alignItems="flex-end">
          <CopyToClipboard text={acctAddr(currentAccount)}>
            <Button
              color="green"
              leftIcon={
                <Icon>
                  <path d={mdiAccount} />
                </Icon>
              }
            >
              {shorten(acctAddr(currentAccount))}
            </Button>
          </CopyToClipboard>
          <HStack alignItems="flex-end">
            <Icon w={5} h={5}>
              <path d={mdiWallet} />
            </Icon>
            <Text>
              {formatBalance(
                accountBalance,
                { withSi: false, forceUnit: '-' },
                chainDecimal
              )}
            </Text>
          </HStack>
        </VStack>
      ) : (
        <Button
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color={navbarIcon}
          variant="transparent-with-icon"
          rightIcon={
            document.documentElement.dir ? (
              <></>
            ) : (
              <Icon w="22px" h="22px" me="0px">
                <path d={mdiAccount} />
              </Icon>
            )
          }
          leftIcon={
            document.documentElement.dir ? (
              <Icon w="22px" h="22px" me="0px">
                <path d={mdiAccount} />
              </Icon>
            ) : (
              <></>
            )
          }
        >
          <Text display={{ sm: 'none', md: 'flex' }}>Connect wallet</Text>
        </Button>
      )}
      <SidebarResponsive
        secondary={props.secondary}
        routes={routes}
        {...rest}
      />
      <UserMenu
        accountList={accountList}
        currentAccount={currentAccount}
        hanldeSwitchAccount={hanldeSwitchAccount}
      />
    </Flex>
  );
};

export default AdminNavbarLinks;
