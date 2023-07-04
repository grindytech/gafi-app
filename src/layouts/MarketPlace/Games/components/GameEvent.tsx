import { Box, Text, Image, HStack, Icon } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import { DataTestArticle } from './GameArticles';
import NextIcon from 'public/assets/line/chevron-01.svg';
import TimeIcon from 'public/assets/line/time.svg';
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
      <Text>Game Events</Text>
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
                  <Box
                    position="absolute"
                    background="rgba(0, 0, 0, 0.70)"
                    borderRadius="1.125rem"
                    backdropFilter="blur(5px)"
                    bottom={3}
                    left={3}
                  >
                    <HStack
                      py={1.5}
                      px={2}
                      color="white"
                      gap={0.5}
                      fontSize="sm"
                    >
                      <Icon as={TimeIcon} h={5} w={5} />
                      <Text>End in </Text>
                      <Text fontWeight="medium">0h 32m 13s</Text>
                    </HStack>
                  </Box>
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
