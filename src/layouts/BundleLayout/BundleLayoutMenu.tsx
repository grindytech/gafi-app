import {
  As,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import MenuIcon from 'public/assets/line/menu.svg';

import { convertHex } from 'utils/utils';
import { Swiper } from 'swiper/types';
import React from 'react';

interface BundleLayoutMenuProps {
  swiperRef: React.MutableRefObject<Swiper | undefined>;
  menu: {
    key: string | number;
    heading: string;
    icon?: As;
    onClick: () => void;
  }[];
}

export default function BundleLayoutMenu({ menu }: BundleLayoutMenuProps) {
  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        variant="unstyled"
        position="absolute"
        inset="0 0 auto auto"
        display="flex"
        bg={convertHex('#000000', 0.2)}
        color="white"
        margin={4}
        zIndex="docked"
        icon={<MenuIcon />}
      />

      <MenuList
        padding={0}
        minWidth="unset"
        bg="transparent"
        overflow="hidden"
        borderRadius="lg"
      >
        {menu.map(menu => (
          <MenuItem
            key={menu.key}
            padding={2}
            color="shader.a.900"
            bg="white"
            gap={2}
            onClick={menu.onClick}
            _hover={{ bg: 'shader.a.200' }}
          >
            {menu.icon && <Icon width={5} height={5} as={menu.icon} />}

            <Text pr={24}>{menu.heading}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
