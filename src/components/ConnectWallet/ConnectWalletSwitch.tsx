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

import { GAFI_WALLET_ACCOUNT_KEY } from 'utils/constants';
import { InjectedAccount } from '@polkadot/extension-inject/types';
import { useDispatch } from 'react-redux';
import { injectedAccount } from 'redux/injected';
import AvatarJazzicon from 'components/Avatar/AvatarJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { convertHex, shorten } from 'utils/utils';
import Swap02Icon from 'public/assets/line/swap-02.svg';
import { colors } from 'theme/theme';
import UploadIcon from 'public/assets/line/upload.svg';

interface ConnectWalletSwitchProps {
  accounts: InjectedAccount[];
}

export default function ConnectWalletSwitch({
  accounts,
}: ConnectWalletSwitchProps) {
  const dispatch = useDispatch();

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
              px={4}
              py={2}
              _hover={{
                bg: convertHex(colors.shader.a[800], 0.25),
              }}
            >
              <Flex
                key={address}
                gap={3}
                width="full"
                onClick={() => {
                  localStorage.setItem(
                    GAFI_WALLET_ACCOUNT_KEY,
                    JSON.stringify({ address, name })
                  );

                  dispatch(
                    injectedAccount({
                      polkadot: { account: { address, name } },
                    })
                  );
                }}
              >
                <Box>
                  <AvatarJazzicon
                    address={address}
                    sx={{ width: '2.25rem', height: '2.25rem' }}
                  />
                </Box>

                <Box>
                  <Text color="white" fontWeight="medium">
                    {name || 'unknown'}
                  </Text>

                  <Flex gap={2} color="shader.a.500" fontSize="sm">
                    {shorten(address, 6)}

                    <ButtonCopy
                      value={address}
                      sx={{
                        as: 'div',
                        'aria-label': 'copy-icon',
                        sx: { svg: { width: 4, height: 4 } },
                      }}
                    />
                  </Flex>
                </Box>
              </Flex>
            </MenuItem>
          ))}

          <MenuItem
            bg="transparent"
            color="shader.a.400"
            px={10}
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
              dispatch(injectedAccount({ polkadot: { account: {} } }));
              localStorage.removeItem(GAFI_WALLET_ACCOUNT_KEY);
            }}
          >
            Log out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
