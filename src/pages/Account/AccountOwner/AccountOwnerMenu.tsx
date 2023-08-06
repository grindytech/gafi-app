import {
  Center,
  Icon,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { convertHex } from 'utils/utils';
import SelectIcon from 'public/assets/line/select.svg';
import TrashIcon from 'public/assets/line/trash.svg';
import MenuIcon from 'public/assets/line/menu.svg';

interface AccountOwnerMenuProps {
  setIsExpanded: (index: number) => void;
  target: number;
}

export default function AccountOwnerMenu({
  target,
  setIsExpanded,
}: AccountOwnerMenuProps) {
  return (
    <Center
      opacity={0}
      transitionDuration="ultra-slow"
      inset="0 0 auto auto"
      margin={2}
      position="absolute"
      backdropFilter="blur(0.75rem)"
      bg={convertHex('#000000', 0.2)}
      borderRadius="lg"
      pointerEvents="none"
      _groupHover={{
        opacity: 1,
        pointerEvents: 'unset',
      }}
    >
      <Menu placement="bottom-end">
        <MenuButton
          as={IconButton}
          variant="unstyled"
          display="flex"
          color="white"
          icon={<MenuIcon />}
        />

        <MenuList padding={0} minWidth="unset">
          <MenuItem padding={0} bg="transparent">
            <List
              padding={2}
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{
                li: {
                  transitionDuration: 'ultra-slow',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  borderRadius: 'lg',
                  padding: 2,
                  color: 'shader.a.600',
                  _hover: {
                    color: 'shader.a.900',
                    bg: 'shader.a.200',
                  },
                },
                p: {
                  pr: 24,
                  fontSize: 'sm',
                },
                svg: {
                  width: 5,
                  height: 5,
                },
              }}
            >
              <ListItem onClick={() => setIsExpanded(target)}>
                <Icon as={SelectIcon} />
                <Text>Select</Text>
              </ListItem>

              <ListItem>
                <Icon as={TrashIcon} />
                <Text>Delete</Text>
              </ListItem>
            </List>
          </MenuItem>
        </MenuList>
      </Menu>
    </Center>
  );
}
