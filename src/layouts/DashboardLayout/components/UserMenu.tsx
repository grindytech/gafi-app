import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ModalTransferERC20Token from './ModalTransferERC20Token';

enum UserMenuModal {
  transferGaki = 'transferGaki',
  transferERC20Token = 'transferERC20Token',
}

const UserMenu: React.FC = () => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState('');
  return (
    <Box p={1}>
      <Menu>
        {({ onClose }: { onClose: () => void }) => (
          <>
            <MenuButton
              aria-label="account-actions"
              ml={4}
              sx={{
                ...actionStyled,
                background: 'url(/assets/layout/actionBg.png) no-repeat center',
              }}
            />
            <MenuList>
              <MenuItem
                onClick={() => {
                  setModalOpen(UserMenuModal.transferERC20Token);
                }}
              >
                <Text>{t('TRANSFER_ERC20_TOKEN')}</Text>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      <ModalTransferERC20Token
        isOpen={modalOpen === UserMenuModal.transferERC20Token}
        onClose={() => {
          setModalOpen('');
        }}
      />
    </Box>
  );
};

export default UserMenu;

const actionStyled = {
  bg: 'white',
  color: 'black',
  w: '56px',
  h: '56px',
  borderRadius: '50%',
};
