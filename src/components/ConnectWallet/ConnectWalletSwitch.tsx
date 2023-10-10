import {
  Box,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';

import Swap02Icon from 'public/assets/line/swap-02.svg';
import { colors } from 'theme/theme';
import UploadIcon from 'public/assets/line/upload.svg';
import { InjectedAccount } from 'types/polkadot.type';
import { convertHex, shorten } from 'utils';
import { useAccountContext } from 'contexts/contexts.account';
import Clipboard from 'components/Clipboard';
import { deleteCookie } from 'utils/utils.cookie';

import { INJECTED_ACCOUNT_CONNECTED } from 'utils/utils.injected';

interface ConnectWalletSwitchProps {
  accounts: InjectedAccount[];
}

export default function ConnectWalletSwitch({
  accounts,
}: ConnectWalletSwitchProps) {
  const { setAccount, setAccountContext } = useAccountContext();

  return (
    <Box
      sx={{
        '> div': {
          inset: 'auto 0 0 0!',
          transform: 'translateY(100%) !important',
        },
      }}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          variant="unstyled"
          bg="shader.a.800"
          color="shader.a.300"
          padding={1.5}
          borderRadius="2xl"
          icon={<Icon as={Swap02Icon} width={4} height={4} />}
        />

        <MenuList
          padding={0}
          minWidth="unset"
          bg="shader.a.900"
          borderRadius="0 0 0.75rem 0.75rem"
          border="0.0625rem solid red"
          borderColor="shader.a.800"
        >
          {accounts.map(({ address, name }) => (
            <MenuItem
              key={address}
              bg="transparent"
              color="shader.a.400"
              transitionDuration="ultra-slow"
              px={8}
              py={2}
              gap={3}
              alignItems="unset"
              _hover={{
                bg: convertHex(colors.shader.a[800], 0.25),
              }}
              onClick={() => setAccount({ address, name })}
            >
              <Box>
                <AvatarJazzicon value={address} size={36} />
              </Box>

              <Box>
                <Text color="white" fontWeight="medium">
                  {name || 'unknown'}
                </Text>

                <Flex gap={2} color="shader.a.500" fontSize="sm">
                  {shorten(address, 6)}

                  <Clipboard
                    value={address}
                    sx={{
                      width: 4,
                      height: 4,
                    }}
                  />
                </Flex>
              </Box>
            </MenuItem>
          ))}

          <MenuItem
            bg="transparent"
            color="shader.a.400"
            px={8}
            py={4}
            icon={
              <Icon
                as={UploadIcon}
                width={4}
                height={4}
                color="primary.a.400"
              />
            }
            onClick={() => {
              deleteCookie(INJECTED_ACCOUNT_CONNECTED);
              setAccountContext(prev => ({ all: prev.all }));
            }}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
