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
  useToast,
} from '@chakra-ui/react';
import { colors } from 'theme/theme';
import AddIcon from 'public/assets/line/add.svg';
import { convertHex } from 'utils/utils';
import { UseFormSetValue } from 'react-hook-form';
import React from 'react';

interface SwitchAdminAddProps {
  setValue: UseFormSetValue<any>;
  value: string;
}

export default function SwitchAdminAdd({
  setValue,
  value,
}: SwitchAdminAddProps) {
  const toast = useToast();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [address, setAddress] = React.useState({
    hash: '',
  });

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
            <Input
              placeholder="Ex: 5DhYY..."
              onChange={e =>
                setAddress({
                  hash: e.target.value,
                })
              }
            />
          </PopoverBody>

          <PopoverFooter>
            <Center gap={2} justifyContent="flex-end">
              <Button variant="cancel" onClick={onClose}>
                Cancel
              </Button>

              <Button
                variant="primary"
                onClick={() => {
                  if (address.hash.length < 48) {
                    return toast({
                      description: `address is wrong !`,
                      status: 'error',
                      position: 'top-right',
                    });
                  }

                  setValue(value, { name: '-', address: address.hash });
                  onClose();
                }}
              >
                Save
              </Button>
            </Center>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
}
