import { HStack, Box, Text, BoxProps, Link, Icon } from '@chakra-ui/react';
import React from 'react';
import CheveronIcon from 'public/assets/line/chevron-02.svg';
interface ViewAllProps {
  title: React.ReactNode;
  link: string;
  sx?: BoxProps;
}
const ViewAll = ({ title, link, sx }: ViewAllProps) => {
  return (
    <HStack
      justifyContent="space-between"
      spacing={0}
      position="sticky"
      left={0}
      {...sx}
    >
      <Box>{title}</Box>

      <Link href={link}>
        <Text
          fontSize="sm"
          fontWeight="semibold"
          display="flex"
          alignItems="center"
          gap={1}
          color="currentcolor"
        >
          See more
          <Icon as={CheveronIcon} transform="rotate(180deg)" />
        </Text>
      </Link>
    </HStack>
  );
};

export default ViewAll;
