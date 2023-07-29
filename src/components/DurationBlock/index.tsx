import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import React from 'react';

import Chevron01Icon from 'public/assets/line/chevron-01.svg';

export interface ListDurationProps {
  text: string;
  time: number;
}

interface DurationBlockProps {
  currentDuration: React.Dispatch<React.SetStateAction<number>>;
}

export default function DurationBlock({ currentDuration }: DurationBlockProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const ListDuration = [
    {
      text: '1 Minutes',
      time: 60,
    },
    {
      text: '1 Hour',
      time: 3600,
    },
    {
      text: '1 Day',
      time: 86400 * 1, // 24H * day
    },
    {
      text: '1 Week',
      time: 86400 * 7, // 24H * day
    },
    {
      text: '2 Weeks',
      time: 86400 * 14, // 24H * day
    },
    {
      text: '1 Month',
      time: 86400 * 30, // 24H * day
    },
  ];

  const [duration, setDuration] = React.useState(ListDuration[0]);

  return (
    <Box>
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
          <Center justifyContent="space-between" padding={4}>
            <Text color="shader.a.">{duration.text}</Text>

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
                ListDuration.filter(meta => meta.text !== duration.text).map(
                  meta => (
                    <ListItem
                      padding={4}
                      transitionDuration="ultra-slow"
                      color="shader.a.900"
                      cursor="pointer"
                      onClick={() => {
                        onClose();
                        setDuration(meta);
                        currentDuration(meta.time);
                      }}
                      _hover={{
                        bg: 'shader.a.300',
                      }}
                    >
                      {meta.text}
                    </ListItem>
                  )
                )
              )}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}
