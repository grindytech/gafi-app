// Chakra Icons
// import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { mdiAccount, mdiWallet } from '@mdi/js';
// Assets
import avatar1 from 'assets/img/avatars/avatar1.png';
import avatar2 from 'assets/img/avatars/avatar2.png';
import avatar3 from 'assets/img/avatars/avatar3.png';

// Custom Icons
// import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
// import { ItemContent } from "components/Menu/ItemContent";
import { FC, useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NavLink } from 'react-router-dom';

import routes from '../../routes';
import { useSubstrate } from '../../substrate-lib';
import { SidebarResponsive } from '../sideBar/SideBar';
import { shorten } from '../utils';

interface IProps {
  variant?: string;
  fixed: boolean;
  secondary: boolean;
  onOpen: () => void;
  logoText: string;
}

const acctAddr = (acct: any) => (acct ? acct.address : '');

const AdminNavbarLinks: FC<IProps> = props => {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const {
    setCurrentAccount,
    state: { keyring, currentAccount, api },
  } = useSubstrate();
  const [accountBalance, setAccountBalance] = useState(0);
  console.log('keyring :>> ', keyring.getPairs());

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe: any;

    // If the user has selected an address, create a new subscription
    currentAccount &&
      api.query.system
        .account(acctAddr(currentAccount), (balance: any) => {
          setAccountBalance(Number(balance.data.free.toJSON()) / 10 ** 18);
        })
        .then((unsub: any) => (unsubscribe = unsub))
        .catch(console.error);

    return () => unsubscribe && unsubscribe();
  }, [api, currentAccount]);

  // Get the list of accounts we possess the private key for
  // Temporary use any. Define type later
  const keyringOptions = keyring.getPairs().map((account: any) => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: 'user',
  }));

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : '';

  // Set the initial address
  useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    !currentAccount &&
      initialAddress.length > 0 &&
      setCurrentAccount(keyring.getPair(initialAddress));
  }, [currentAccount, setCurrentAccount, keyring, initialAddress]);

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
      alignItems="center"
      flexDirection="row"
    >
      {/* <InputGroup
        cursor="pointer"
        bg={inputBg}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        _focus={{
          borderColor: { mainTeal },
        }}
        _active={{
          borderColor: { mainTeal },
        }}
      >
        <InputLeftElement>
          <IconButton
            aria-label="search-button"
            bg="inherit"
            borderRadius="inherit"
            hover="none"
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
            icon={<SearchIcon color={searchIcon} w="15px" h="15px" />}
          />
        </InputLeftElement>
        <Input
          fontSize="xs"
          py="11px"
          color={mainText}
          placeholder="Type here..."
          borderRadius="inherit"
        />
      </InputGroup> */}
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
            <Text>{accountBalance.toLocaleString()}</Text>
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
        // logo={logo}
        {...rest}
      />
      {/* <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        ref={settingsRef}
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      /> */}
      <Menu>
        <MenuButton>
          {/* <BellIcon color={navbarIcon} w="18px" h="18px" /> */}
        </MenuButton>
        <MenuList p="16px 8px">
          <Flex flexDirection="column">
            <MenuItem borderRadius="8px" mb="10px">
              {/* <ItemContent
                time="13 minutes ago"
                info="from Alicia"
                boldInfo="New Message"
                aName="Alicia"
                aSrc={avatar1}
              /> */}
            </MenuItem>
            <MenuItem borderRadius="8px" mb="10px">
              {/* <ItemContent
                time="2 days ago"
                info="by Josh Henry"
                boldInfo="New Album"
                aName="Josh Henry"
                aSrc={avatar2}
              /> */}
            </MenuItem>
            <MenuItem borderRadius="8px">
              {/* <ItemContent
                time="3 days ago"
                info="Payment succesfully completed!"
                boldInfo=""
                aName="Kara"
                aSrc={avatar3}
              /> */}
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default AdminNavbarLinks;
