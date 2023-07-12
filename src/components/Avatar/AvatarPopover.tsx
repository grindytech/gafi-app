import {
  Box,
  Button,
  HStack,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import AccountJazzicon from 'components/AccountJazzicon/AccountJazzicon';
import ButtonCopy from 'components/ButtonCopy';
import { shorten } from 'utils/utils';

interface AvatarPopoverProps extends React.PropsWithChildren {
  type: 'Owner' | 'Admin';
  name: string;
  address: string;
}

export default function AvatarPopover({
  type,
  name,
  address,
  children,
}: AvatarPopoverProps) {
  return (
    <Popover placement="top-start" trigger="hover">
      <PopoverTrigger>
        <Button variant="unstyled" minWidth="auto" width={8} height={8}>
          {children}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        width="inherit"
        borderRadius="lg"
        border="0.0625rem solid"
        borderColor="shader.a.300"
        fontSize="sm"
        fontWeight="medium"
      >
        <PopoverBody>
          <Heading
            as="h6"
            color="primary.a.500"
            fontSize="inherit"
            fontWeight="inherit"
          >
            {type}
          </Heading>

          <HStack spacing={3} mt={3}>
            <AccountJazzicon address={address} />

            <Box>
              <Heading
                as="h6"
                color="shader.a.900"
                fontSize="inherit"
                fontWeight="inherit"
              >
                {name}
              </Heading>

              <Text
                fontSize="inherit"
                fontWeight="normal"
                color="shader.a.500"
                display="flex"
                alignItems="center"
                gap={1}
              >
                {shorten(address, 12)}
                <ButtonCopy
                  value={address}
                  sx={{
                    'aria-label': 'copy-icon',
                    sx: {
                      svg: {
                        width: 4,
                        height: 4,
                      },
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
