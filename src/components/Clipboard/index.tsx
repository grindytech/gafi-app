import { Icon, IconProps, useClipboard } from '@chakra-ui/react';
import CopyIcon from 'public/assets/line/copy.svg';
import DoneIcon from 'public/assets/fill/done.svg';

interface ClipBoardProps {
  value: string;
  sx?: IconProps;
}

export default ({ value, sx }: ClipBoardProps) => {
  const { hasCopied, onCopy } = useClipboard(value);

  return (
    <Icon
      onClick={onCopy}
      width={5}
      height={5}
      color="primary.a.300"
      cursor="pointer"
      as={hasCopied ? DoneIcon : CopyIcon}
      {...sx}
    />
  );
};
