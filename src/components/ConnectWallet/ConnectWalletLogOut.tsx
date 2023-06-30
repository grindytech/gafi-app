import UploadIcon from 'public/assets/line/upload.svg';
import { Button, Icon, Text } from '@chakra-ui/react';
import { GAFI_WALLET_ACCOUNT_KEY } from 'utils/constants';
import { useAppDispatch } from 'hooks/useRedux';
import { injectedAccount } from 'redux/injected';

interface ConnectWalletLogOutProps {
  onClose: () => void;
}

export default function ConnectWalletLogOut({
  onClose,
}: ConnectWalletLogOutProps) {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="unstyled"
      display="flex"
      justifyContent="flex-start"
      borderTop="0.0625rem solid"
      borderColor="shader.a.300"
      borderRadius="unset"
      py={3}
      px={4}
      width="full"
      height="auto"
      minWidth="auto"
      onClick={() => {
        onClose();

        localStorage.removeItem(GAFI_WALLET_ACCOUNT_KEY);
        dispatch(
          injectedAccount({
            polkadot: {
              account: {},
            },
          })
        );
      }}
      _hover={{
        bg: 'shader.a.200',
      }}
      leftIcon={
        <Icon
          as={UploadIcon as any}
          width={5}
          height={5}
          color="primary.a.500"
        />
      }
    >
      <Text color="shader.a.900" fontSize="md" fontWeight="medium">
        Log out
      </Text>
    </Button>
  );
}
