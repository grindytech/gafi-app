import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
} from '@chakra-ui/react';
import { KeyringPair } from '@polkadot/keyring/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { shorten } from '../utils';
import { acctAddr } from './AdminNavbarLinks';

interface IProps {
  hanldeSwitchAccount: (index: number) => void;
  accountList: string[];
  currentAccount: KeyringPair | null;
}

const UserMenu: React.FC<IProps> = ({
  accountList,
  currentAccount,
  hanldeSwitchAccount,
}) => {
  const { t } = useTranslation();
  return (
    <Box p={1}>
      <Menu>
        {({ onClose }: { onClose: () => void }) => (
          <>
            <MenuButton>
              <Avatar size="sm" _hover={{ zIndex: '3', cursor: 'pointer' }} />
            </MenuButton>
            <MenuList p="16px 8px">
              <Flex flexDirection="column">
                <MenuItem borderRadius="8px" mb="10px">
                  <Link to="/admin/sponsored-pool?type=owned">
                    <Text>{t('MY_SPONSORED_POOLS')}</Text>
                  </Link>
                </MenuItem>
                {currentAccount ? (
                  <MenuItem closeOnSelect={false} borderRadius="8px">
                    <Menu>
                      <MenuButton>{t('SWITCH_ACCOUNT')}</MenuButton>
                      <MenuList>
                        <MenuOptionGroup
                          defaultValue={acctAddr(currentAccount)}
                          type="radio"
                        >
                          {accountList.map((account: string, index: number) => (
                            <MenuItemOption
                              onClick={() => {
                                hanldeSwitchAccount(index);
                                onClose();
                              }}
                              value={account}
                            >
                              {shorten(account)}
                            </MenuItemOption>
                          ))}
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>
                  </MenuItem>
                ) : null}
              </Flex>
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default UserMenu;
