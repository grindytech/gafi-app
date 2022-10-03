import {
  Button,
  ButtonGroup,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const StyledWalletModal = {
  ':not(:first-child)': {
    mt: 4,
  },
  '-webkit-margin-start': '0 !important',
  justifyContent: 'start',
  pl: 4,
};

export interface IButtonWalletProps {
  key: number;
  title: string;
  icon: string | JSX.Element;
}

interface IWalletConnectProps {
  onClick: (props: IButtonWalletProps) => void;
  onCloseWallet?: () => void;
  isOpen: boolean;
}

export default function WalletConnect({
  onClick,
  onCloseWallet,
  isOpen,
}: IWalletConnectProps) {
  const { t } = useTranslation();

  const ButtonModal = [
    {
      key: 0,
      title: t('POLKADOT_CONNECT'),
      icon: '/assets/layout/polkadot.png',
    },
    {
      key: 1,
      title: t('METAMASK_CONNECT'),
      icon: '/assets/layout/metamask.png',
    },
    {
      key: 2,
      title: t('METAMASK_CONNECT'),
      icon: '/assets/layout/metamask.png',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={() => onCloseWallet}>
      <ModalOverlay />

      <ModalContent p={4}>
        <ModalHeader>{t('CONNECT_WALLET_POLKADOT')}</ModalHeader>

        <ModalBody>
          <ButtonGroup display="flex" flexDirection="column" flex={1}>
            {ButtonModal.map(button => [
              <Button
                leftIcon={<Image src={button.icon} />}
                iconSpacing={4}
                key={button.key}
                variant="ghost"
                size="md"
                onClick={() => onClick(button)}
                sx={StyledWalletModal}
              >
                {button.title}
              </Button>,
            ])}
          </ButtonGroup>
        </ModalBody>

        <ModalFooter justifyContent="center" letterSpacing={1}>
          FAQ: why we need connect to wallet? <Link ml={2}>here</Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
