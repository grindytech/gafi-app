import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Center,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import React from 'react';

import Chevron01Icon from 'public/assets/line/chevron-01.svg';
import { BLOCK_TIME } from 'utils/constants';

export interface ListDurationProps {
  text: string;
  time: number;
}

// unit seconds
export const ListDuration: ListDurationProps[] = [
  {
    text: '1 Minutes',
    time: 60 / BLOCK_TIME,
  },
  {
    text: '5 Minutes',
    time: 300 / BLOCK_TIME,
  },
  {
    text: '1 Hours',
    time: 3600 / BLOCK_TIME,
  },
  {
    text: '1 Day',
    time: (86400 * 1) / BLOCK_TIME,
  },
  {
    text: '1 Week',
    time: (86400 * 7) / BLOCK_TIME,
  },
  {
    text: '2 Weeks',
    time: (86400 * 14) / BLOCK_TIME,
  },
  {
    text: '1 Month',
    time: (86400 * 30) / BLOCK_TIME,
  },
];

interface DurationBlockProps {
  duration: ListDurationProps;
  setCurrentDuration: React.Dispatch<React.SetStateAction<ListDurationProps>>;
  listDuration: ListDurationProps[];
  sx?: BoxProps;
}

export default function DurationBlock({
  duration,
  setCurrentDuration,
  listDuration,
  sx,
}: DurationBlockProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <Box {...sx}>
      <Text mb={2} color="shader.a.500" fontSize="sm" fontWeight="medium">
        Duration
      </Text>

      <Accordion allowToggle index={isOpen ? 0 : 1}>
        <AccordionItem
          borderRadius="xl"
          border="0.0625rem solid"
          borderColor="shader.a.300"
          overflow="hidden"
          fontSize="sm"
          fontWeight="medium"
        >
          <Center
            className="current-minute"
            justifyContent="space-between"
            padding={4}
          >
            <Text as="span" color="shader.a.900">
              {duration.text}
            </Text>

            <AccordionButton
              width="auto"
              padding={0}
              onClick={onToggle}
              transform={isOpen ? 'rotate(-180deg)' : undefined}
            >
              <Chevron01Icon />
            </AccordionButton>
          </Center>

          <AccordionPanel
            padding={0}
            borderTop="0.0625rem solid"
            borderColor="shader.a.300"
          >
            <List>
              {React.Children.toArray(
                listDuration
                  .filter(meta => meta.text !== duration.text)
                  .map(meta => (
                    <ListItem
                      padding={4}
                      transitionDuration="ultra-slow"
                      color="shader.a.900"
                      cursor="pointer"
                      onClick={() => {
                        onClose();
                        setCurrentDuration(meta);
                      }}
                      _hover={{
                        bg: 'shader.a.300',
                      }}
                    >
                      {meta.text}
                    </ListItem>
                  ))
              )}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
