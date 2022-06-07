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
import { BN, formatBalance } from '@polkadot/util';
import { FC, useCallback, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';

import routes from '../../routes';
import { useSubstrate } from '../../substrate-lib';
import { SidebarResponsive } from '../sideBar/SideBar';
import { acctAddr, getGAKIAccountAddress, shorten } from '../utils';

import UserMenu from './UserMenu';

interface IProps {
  variant?: string;
  fixed: boolean;
  secondary: boolean;
  onOpen: () => void;
  logoText: string;
}

const AdminNavbarLinks: FC<IProps> = props => {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const { account } = useWallet();
  const {
    setCurrentAccount,
    state: { keyring, currentAccount, api, chainDecimal },
  } = useSubstrate();
  const pairs = keyring?.getPairs() || [];
  const accountList = pairs.map((key: KeyringPair) => acctAddr(key));
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
  // Set the initial address
  useEffect(() => {
    setPolkadotAccount();
  }, [setPolkadotAccount]);

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

  let navbarIcon = useColorModeValue('gray.500', 'gray.200');

  if (secondary) {
    navbarIcon = 'white';
  }
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
        accountBalance={accountBalance}
        accountList={accountList}
        currentAccount={currentAccount}
        hanldeSwitchAccount={hanldeSwitchAccount}
      />
    </Flex>
  );
};

export default AdminNavbarLinks;
