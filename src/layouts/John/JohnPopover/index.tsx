import {
  Box,
  BoxProps,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useOutsideClick,
} from '@chakra-ui/react';

import Chevron01Icon from 'public/assets/line/chevron-01.svg';

import { convertHex } from 'utils';
import { colors } from 'theme/theme';
import { PropsWithChildren, useRef } from 'react';

interface JohnPopoverProps extends PropsWithChildren {
  isOpen?: boolean;
  onToggle: () => void;
  onClose: () => void;
  sx?: BoxProps;
}

export default ({
  isOpen,
  onToggle,
  onClose,
  sx,
  children,
}: JohnPopoverProps) => {
  const ref = useRef(null);

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  return (
    <Box ref={ref} {...sx}>
      <Popover isOpen={isOpen}>
        <PopoverTrigger>
          <IconButton
            aria-label="chevron-popover"
            variant="unstyled"
            color="white"
            transform={isOpen ? 'rotate(-180deg)' : undefined}
            onClick={onToggle}
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
        >
          <PopoverContent
            bg={convertHex(colors.shader.a[800], 0.25)}
            width="full"
            height="10rem"
            border="unset"
            borderTop="0.0625rem solid"
            borderColor="shader.a.800"
            overflowY="auto"
          >
            <PopoverBody
              pointerEvents={isOpen ? undefined : 'none'} // when close i don't no, why users still click good?
              padding={0}
              wordBreak="break-word"
              height="full"
            >
              {children}
            </PopoverBody>
          </PopoverContent>
        </Box>
      </Popover>
    </Box>
  );
};
