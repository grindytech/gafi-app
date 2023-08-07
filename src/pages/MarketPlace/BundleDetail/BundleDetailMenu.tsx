import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import MenuIcon from 'public/assets/line/menu.svg';
import ShareIcon from 'public/assets/line/share.svg';

import { useNavigate } from 'react-router-dom';
import { convertHex } from 'utils/utils';
import { Swiper } from 'swiper/types';
import { GafiSupportGameTypesPackage } from '@polkadot/types/lookup';

interface BundleDetailMenuProps {
  swiperRef: React.MutableRefObject<Swiper | undefined>;
  data: GafiSupportGameTypesPackage[];
}

export default function BundleDetailMenu({
  swiperRef,
  data,
}: BundleDetailMenuProps) {
  const navigation = useNavigate();

  const ListMenu = [
    {
      key: 0,
      heading: 'Detail',
      icon: ShareIcon,
      onClick: () => {
        if (swiperRef.current) {
          const response = data[swiperRef.current.realIndex];

          navigation({
            pathname: `/marketplace/nft/${response.item.toNumber()}/${response.collection.toNumber()}`,
          });
        }
      },
    },
    {
      key: 1,
      heading: 'Share',
      icon: ShareIcon,
    },
  ];

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
        {ListMenu.map(menu => (
          <MenuItem
            key={menu.key}
            padding={2}
            color="shader.a.900"
            bg="white"
            gap={2}
            onClick={menu.onClick}
            _hover={{ bg: 'shader.a.200' }}
          >
            <Icon width={5} height={5} as={menu.icon} />

            <Text pr={24}>{menu.heading}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
