import {
  Box,
  BoxProps,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';

import Chevron01Icon from 'public/assets/line/chevron-01.svg';

import { convertHex } from 'utils/utils';
import { colors } from 'theme/theme';
import { PropsWithChildren } from 'react';

interface JohnPopoverProps extends PropsWithChildren {
  allowToggle?: boolean;
  sx?: BoxProps;
}

export default ({ allowToggle, sx, children }: JohnPopoverProps) => {
  return (
    <Popover>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            <IconButton
              aria-label="chevron-popover"
              variant="unstyled"
              color="white"
              transform={isOpen ? 'rotate(-180deg)' : undefined}
              transitionDuration="ultra-slow"
              icon={<Icon as={Chevron01Icon} width={6} height={6} />}
            />
          </PopoverTrigger>

          <Box
            sx={{
              '.chakra-popover__popper': {
                transform: 'translateY(100%) !important',
                width: 'full',
                height: 'full',
                minWidth: 'auto !important',
              },
            }}
            {...sx}
          >
            <PopoverContent
              bg={convertHex(colors.shader.a[800], 0.25)}
              width="full"
              height="full"
              border="unset"
              borderTop="0.0625rem solid"
              borderColor="shader.a.800"
              overflowY="auto"
              onClick={() => {
                if (allowToggle) {
                  onClose();
                }
              }}
            >
              <PopoverBody padding={0} wordBreak="break-word" height="full">
                {children}
              </PopoverBody>
            </PopoverContent>
          </Box>
        </>
      )}
    </Popover>
  );
};
