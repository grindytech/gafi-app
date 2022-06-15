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
            <MenuButton>
              <IconButton
                aria-label="Search database"
                ml={4}
                sx={{
                  ...actionStyled,
                  background:
                    'url(/assets/layout/actionBg.png) no-repeat center',
                }}
              />
            </MenuButton>
            <MenuList
              sx={{
                bg: 'linear-gradient(227.25deg, #3860FF 2.24%, #56CCF2 127.36%)',
                border: 'none',
              }}
              w="300px"
              borderRadius="32px"
              p={8}
            >
              <MenuItem
                _focus={{ bg: 'rgba(255, 255, 255, 0.25)', fontWeight: 'bold' }}
                sx={{
                  py: 3,
                  px: 8,
                  m: 0,
                  borderRadius: '40px',
                  color: 'white',
                }}
                onClick={() => {
                  setModalOpen(UserMenuModal.transferERC20Token);
                }}
                borderRadius="8px"
                mb={3}
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
