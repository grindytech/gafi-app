import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ModalTransferERC20Token from './ModalTransferERC20Token';
import ModalTransferGaki from './ModalTransferGaki';

enum UserMenuModal {
  transferGaki = 'transferGaki',
  transferERC20Token = 'transferERC20Token',
}

const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState('');

  const onClose = () => {
    setModalOpen('');
  };

  const onOpenTransferGakiModal = () => {
    setModalOpen(UserMenuModal.transferGaki);
  };

  const onOpenTransferERC20TokenModal = () => {
    setModalOpen(UserMenuModal.transferERC20Token);
  };

  return (
    <Box p={1}>
      <Menu>
        <MenuButton
          aria-label="account-actions"
          ml={4}
          sx={{
            ...actionStyled,
            background: 'url(/assets/layout/actionBg.png) no-repeat center',
          }}
        />
        <MenuList>
          <MenuItem onClick={onOpenTransferERC20TokenModal}>
            <Text>{t('TRANSFER_ERC20_TOKEN')}</Text>
          </MenuItem>
          <MenuItem onClick={onOpenTransferGakiModal}>
            <Text>{t('TRANSFER_GAKI')}</Text>
          </MenuItem>
          <MenuItem>
            <Link to="/admin/sponsored-pool?type=owned">
              <Text>{t('MY_SPONSORED_POOLS')}</Text>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
      <ModalTransferERC20Token
        isOpen={modalOpen === UserMenuModal.transferERC20Token}
        onClose={onClose}
      />
      <ModalTransferGaki
        isOpen={modalOpen === UserMenuModal.transferGaki}
        onClose={onClose}
      />
    </Box>
  );
};

export default UserMenu;

const actionStyled = {
  bg: 'white',
  color: 'black',
  w: '40px',
  h: '40px',
  borderRadius: '50%',
};
