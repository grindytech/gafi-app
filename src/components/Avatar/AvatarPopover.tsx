import {
  Box,
  Button,
  ButtonProps,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import ButtonCopy from 'components/ButtonCopy';
import { shorten } from 'utils/utils';
import AvatarJazzicon from './AvatarJazzicon';

interface AvatarPopoverProps extends React.PropsWithChildren {
  type: 'Owner' | 'Admin';
  name: string;
  address: string;
  sx?: ButtonProps;
}

export default function AvatarPopover({
  type,
  name,
  address,
  children,
  sx,
}: AvatarPopoverProps) {
  return (
    <Popover placement="top-start" trigger="hover">
      <PopoverTrigger>
        <Button variant="unstyled" minWidth="auto" width={8} height={8} {...sx}>
          {children}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        width="inherit"
        fontSize="sm"
        fontWeight="medium"
        bg="shader.a.800"
        borderColor="shader.a.600"
        color="white"
      >
        <PopoverBody>
          <Text>{type}</Text>

          <HStack spacing={3} mt={3}>
            <AvatarJazzicon address={address} />

            <Box>
              <Text>{name}</Text>

              <Text display="flex" alignItems="center" gap={1}>
                {shorten(address, 12)}
                <ButtonCopy
                  value={address}
                  sx={{
                    'aria-label': 'copy-icon',
                    sx: {
                      svg: { width: 4, height: 4 },
                    },
                  }}
                />
              </Text>
            </Box>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
