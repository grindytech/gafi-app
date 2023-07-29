import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { GAFI_WALLET_ACCOUNT_KEY } from 'utils/constants';
import ConnectWalletProfile from './ConnectWalletProfile';
import { InjectedAccount } from '@polkadot/extension-inject/types';
import { useDispatch } from 'react-redux';
import { injectedAccount } from 'redux/injected';

interface ConnectWalletSwitchProps extends PropsWithChildren {
  onClose: () => void;
  isOpen: boolean;
  accounts: InjectedAccount[];
}

export default function ConnectWalletSwitch({
  onClose,
  isOpen,
  accounts,
  children,
}: ConnectWalletSwitchProps) {
  const dispatch = useDispatch();

  return (
    <Box
      zIndex="dropdown"
      pointerEvents={isOpen ? undefined : 'none'}
      opacity={isOpen ? undefined : 0}
      transitionDuration="ultra-slow"
      position="absolute"
      transform="translateY(5%)"
      bg="white"
      border="0.0625rem solid"
      borderColor="shader.a.300"
      borderRadius="xl"
      right={0}
      left={0}
    >
      {accounts.map(item => {
        const { address, name } = item;

        return (
          <Box
            key={address}
            onClick={() => {
              onClose();

              localStorage.setItem(
                GAFI_WALLET_ACCOUNT_KEY,
                JSON.stringify({ address, name })
              );

              return dispatch(
                injectedAccount({
                  polkadot: {
                    account: { address, name },
                  },
                })
              );
            }}
          >
            <ConnectWalletProfile
              address={address}
              name={name}
              sx={{
                _hover: {
                  bg: 'shader.a.200',
                },
                sx: {
                  button: {
                    display: 'none',
                  },
                },
              }}
            />
          </Box>
        );
      })}

      {children}
    </Box>
  );
}
