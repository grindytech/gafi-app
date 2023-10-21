import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Center,
  Icon,
  Text,
} from '@chakra-ui/react';

import Chevron01Icon from 'public/assets/line/chevron-01.svg';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { GamesFieldProps } from '.';

interface GamesCategoriesProps {
  setValue: UseFormSetValue<GamesFieldProps>;
  watch: UseFormWatch<GamesFieldProps>;
}

export default ({ setValue, watch }: GamesCategoriesProps) => {
  const categories = watch('category');

  const ListCategories: GamesFieldProps['category'][] = [
    'Art',
    'Domain Names',
    'Gaming',
    'Memberships',
    'Music',
  ];

  return (
    <Accordion allowToggle>
      <AccordionItem border="unset">
        {({ isExpanded }) => (
          <>
            <Center
              justifyContent="space-between"
              borderRadius="xl"
              bg="shader.a.900"
              py={3}
              px={4}
            >
              <Text
                fontSize="sm"
                color={categories?.length ? 'white' : 'shader.a.600'}
              >
                {categories || 'Select categories'}
              </Text>

              <AccordionButton padding={0} width="auto">
                <Icon
                  as={Chevron01Icon}
                  width={6}
                  height={6}
                  color="white"
                  transitionDuration="ultra-slow"
                  transform={isExpanded ? 'rotate(-180deg)' : undefined}
                />
              </AccordionButton>
            </Center>

            <AccordionPanel
              color="white"
              borderRadius="xl"
              padding={0}
              mt={2}
              overflow="hidden"
              bg="shader.a.900"
            >
              {ListCategories.map(meta => (
                <AccordionButton
                  key={meta}
                  padding={4}
                  fontSize="sm"
                  transitionDuration="ultra-slow"
                  onClick={() => setValue('category', meta)}
                  _hover={{
                    bg: 'shader.a.600',
                  }}
                >
                  {meta}
                </AccordionButton>
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
