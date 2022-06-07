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
  useDisclosure,
} from '@chakra-ui/react';
import { KeyringPair } from '@polkadot/keyring/types';
import { BN } from '@polkadot/util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { acctAddr, shorten } from '../utils';

import ModalTransferToken from './ModalTransferToken';

import { checkFeature, EFeatureFlag } from 'components/FeatureFlags';

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
  const isDisplayGameCreatorFeature = checkFeature(EFeatureFlag.GameCreator);
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                <MenuItem onClick={onOpen} borderRadius="8px" mb={3}>
                  <Text>{t('TRANSFER_TOKEN')}</Text>
                </MenuItem>
                <MenuItem borderRadius="8px" mb={3}>
                  <Link to="/admin/sponsored-pool?type=owned">
                    <Text>{t('MY_SPONSORED_POOLS')}</Text>
                  </Link>
                </MenuItem>
                {currentAccount ? (
                  <MenuItem closeOnSelect={false} borderRadius="8px" mb={3}>
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
      <ModalTransferToken
        accountList={accountList}
        isOpen={isOpen}
        onClose={onClose}
        accountBalance={accountBalance}
      />
    </Box>
  );
};

export default UserMenu;
