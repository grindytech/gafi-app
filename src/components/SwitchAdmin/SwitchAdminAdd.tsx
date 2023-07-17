import {
  Button,
  Center,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { colors } from 'theme/theme';
import AddIcon from 'public/assets/line/add.svg';
import { convertHex } from 'utils/utils';

export default function SwitchAdminAdd() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <Popover isOpen={isOpen} onClose={onClose} placement="bottom-end">
        <PopoverTrigger>
          <IconButton
            onClick={onToggle}
            aria-label="add-icon"
            transitionDuration="ultra-slow"
            _hover={{
              bg: convertHex(colors.primary.a[500], 0.1),
            }}
            icon={
              <Icon
                as={AddIcon}
                width={6}
                height={6}
                color="primary.a.500"
                transitionDuration="inherit"
              />
            }
          />
        </PopoverTrigger>

        <PopoverContent>
          <PopoverHeader>Add Address</PopoverHeader>

          <PopoverBody>
            <Input placeholder="Ex: 5DhYY..." />
          </PopoverBody>

          <PopoverFooter>
            <Center gap={2} justifyContent="flex-end">
              <Button variant="cancel" onClick={onClose}>
                Cancel
              </Button>

              <Button variant="primary">Save</Button>
            </Center>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
