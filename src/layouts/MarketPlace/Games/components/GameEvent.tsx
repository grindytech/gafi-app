import { Box, Text, Image, HStack, Icon } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import { DataTestArticle } from './GameArticles';
import NextIcon from 'public/assets/line/chevron-01.svg';
import TimeReminder from 'components/Time/TimeReminder';
const GameEvent = () => {
  return (
    <Box
      borderRadius="16px"
      background="shader.a.900"
      color="shader.a.100"
      px={'32px'}
      pt={8}
      pb={20}
    >
      <HStack justifyContent="space-between">
        <Text
          color="shader.a.100"
          fontSize="2xl"
          fontWeight="bold"
          lineHeight="2"
        >
          Game Event
        </Text>
        <HStack
          border="0.063rem solid"
          borderColor="shader.a.700"
          borderRadius="lg"
          py={2}
          px={3}
        >
          <Text fontSize="sm" fontWeight="medium">
            View all
          </Text>
          <Icon as={NextIcon} transform="rotate(-90deg)" />
        </HStack>
      </HStack>

      <Box mt={4}>
        <Carousel
          breakPointCustom={{
            360: {
              slidesPerView: 1,
            },
            630: {
              slidesPerView: 2,
            },
            920: {
              slidesPerView: 2,
            },

            1440: {
              slidesPerView: 3,
            },
          }}
        >
          {DataTestArticle.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                borderRadius="lg"
                border="0.063rem solid"
                bg="shader.a.800"
                borderColor="shader.a.700"
              >
                <Box width="full" padding={2} position="relative">
                  <Image
                    objectFit="cover"
                    src={item.image}
                    alt={`Image ${item.title}`}
                    width="full"
                    h="242px"
                    borderRadius="xl"
                  />
                  <TimeReminder sx={{ position: 'absolute' }} />
                </Box>
                <Box padding={6} color="shader.a.100">
                  <Text lineHeight="1.5rem" fontWeight="medium">
                    {item.title}
                  </Text>
                  <Text color="shader.a.400" fontSize="sm" noOfLines={2} mb={4}>
                    {item.description}
                  </Text>
                  <HStack gap={0.5}>
                    <Text fontSize="sm" fontWeight="medium">
                      Reward
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default GameEvent;
