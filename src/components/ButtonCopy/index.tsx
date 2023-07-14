import { IconButton, IconButtonProps, useClipboard } from '@chakra-ui/react';
import CopyIcon from 'public/assets/line/copy.svg';
import DoneIcon from 'public/assets/fill/done.svg';

interface ButtonCopyProps {
  value: string;
  sx?: IconButtonProps;
}

export default function ButtonCopy({ value, sx }: ButtonCopyProps) {
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <IconButton
      variant="unstyled"
      height="auto"
      minWidth="auto"
      aria-label="button-copy"
      color="primary.a.500"
      onClick={onCopy}
      sx={{
        svg: {
          width: 5,
          height: 5,
        },
      }}
      icon={hasCopied ? <DoneIcon /> : <CopyIcon />}
      {...sx}
    />
  );
}
