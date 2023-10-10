import ConnectWalletModal from './ConnectWalletModal';
import { useAccountContext } from 'contexts/contexts.account';
import ConnectWalletProfile from './ConnectWalletProfile';
import { Button, useDisclosure } from '@chakra-ui/react';
export default function ConnectWallet() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { account, setAccount } = useAccountContext();

  return (
    <>
      {account.current?.address && account.all?.length ? (
        <ConnectWalletProfile
          account={account.current}
          accounts={account.all}
        />
      ) : (
        <Button
          variant="unstyled"
          borderRadius="3xl"
          py={3}
          px={6}
          minWidth="auto"
          height="auto"
          border="0.0625rem solid"
          borderColor="shader.a.700"
          fontSize="sm"
          fontWeight="medium"
          color="shader.a.200"
          bg="shader.a.800"
          onClick={onOpen}
        >
          Connect Wallet
        </Button>
      )}

      {isOpen && (
        <ConnectWalletModal onClose={onClose} setAccount={setAccount} />
      )}
    </>
  );
}
