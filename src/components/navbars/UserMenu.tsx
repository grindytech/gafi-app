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
import { BN } from '@polkadot/util';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import ModalTransferERC20Token from './ModalTransferERC20Token';
import ModalTransferGaki from './ModalTransferGaki';

import featureFlags from 'components/FeatureFlags';
import { acctAddr, shorten } from 'components/utils';

enum UserMenuModal {
  transferGaki = 'transferGaki',
  transferERC20Token = 'transferERC20Token',
}

interface IProps {
  hanldeSwitchAccount: (index: number) => void;
  accountList?: string[];
  currentAccount: KeyringPair | null;
  accountBalance: BN;
}

const UserMenu: React.FC<IProps> = ({
  accountList,
  currentAccount,
  hanldeSwitchAccount,
  accountBalance,
}) => {
  const { checkFeature, EFeatureFlag } = featureFlags;
  const isDisplayGameCreatorFeature = checkFeature(EFeatureFlag.GameCreator);
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState('');

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
                <MenuItem
                  onClick={() => {
                    setModalOpen(UserMenuModal.transferGaki);
                  }}
                  borderRadius="8px"
                  mb={3}
                >
                  <Text>{t('TRANSFER_GAKI')}</Text>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setModalOpen(UserMenuModal.transferERC20Token);
                  }}
                  borderRadius="8px"
                  mb={3}
                >
                  <Text>{t('TRANSFER_ERC20_TOKEN')}</Text>
                </MenuItem>
                <MenuItem borderRadius="8px" mb={3}>
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
                          {accountList?.map(
                            (account: string, index: number) => (
                              <MenuItemOption
                                key={account}
                                onClick={() => {
                                  hanldeSwitchAccount(index);
                                  onClose();
                                }}
                                value={account}
                              >
                                {shorten(account)}
                              </MenuItemOption>
                            )
                          )}
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>
                  </MenuItem>
                ) : null}
                {isDisplayGameCreatorFeature && (
                  <MenuItem borderRadius="8px" mb={3}>
                    <Link to="/admin/contracts">
                      <Text>{t('MY_CONTRACTS')}</Text>
                    </Link>
                  </MenuItem>
                )}
              </Flex>
            </MenuList>
          </>
        )}
      </Menu>
      <ModalTransferGaki
        accountList={accountList}
        isOpen={modalOpen === UserMenuModal.transferGaki}
        onClose={() => {
          setModalOpen('');
        }}
        accountBalance={accountBalance}
      />
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
