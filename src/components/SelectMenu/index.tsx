import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { convertHex } from 'utils/utils';

import MenuIcon from 'public/assets/line/menu.svg';
import React from 'react';

interface SelectMenuProps {
  menu: {
    icon?: any;
    heading: string;
    onClick?: () => void;
  }[];
}

export default ({ menu }: SelectMenuProps) => {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        variant="unstyled"
        color="white"
        bg={convertHex('#000000', 0.2)}
        position="absolute"
        zIndex="docked"
        inset="0 0 auto auto"
        padding={1}
        margin={2}
        icon={<Icon as={MenuIcon} width={5} height={5} />}
      />

      <MenuList
        padding={3}
        minWidth="unset"
        bg="shader.a.900"
        borderRadius="xl"
        border="0.0625rem solid red"
        borderColor="shader.a.800"
      >
        {React.Children.toArray(
          menu.map(meta => (
            <MenuItem
              padding={2}
              bg="transparent"
              color="shader.a.400"
              borderRadius="lg"
              gap={2}
              onClick={meta.onClick}
              _hover={{ bg: 'shader.a.800', color: 'white' }}
            >
              <Icon width={5} height={5} />

              <Text pr={20}>{meta.heading}</Text>
            </MenuItem>
          ))
        )}
      </MenuList>
    </Menu>
  );
};
