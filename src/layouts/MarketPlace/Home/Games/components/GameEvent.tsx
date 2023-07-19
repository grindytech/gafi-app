import { Box, Text, Image, HStack, Icon } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Autoplay } from 'swiper';
import GafiIcon from 'public/assets/token/gafi-token.svg';
import NextIcon from 'public/assets/line/chevron-01.svg';
import BgGrid from 'public/assets/background/bg-grid.svg';
import TimeReminder from 'components/Time/TimeReminder';
import { DataTestArticle } from 'layouts/MarketPlace/Explorer/DataTest';
const GameEvent = () => {
  return (
    <Box
      borderRadius="2xl"
      background="shader.a.900"
      color="shader.a.100"
      px={{ md: 8, base: 4 }}
      pt={{ md: 9, base: 4 }}
      pb={20}
      position="relative"
      overflow="hidden"
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
          options={{
            modules: [Autoplay, Navigation, Mousewheel],
            autoplay: {
              delay: 2500,
              disableOnInteraction: false,
            },
            loop: true,
            breakpoints: {
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
            },
          }}
          styleButton={{
            color: 'white',
            bg: 'shader.a.600',
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
                  <TimeReminder
                    sx={{ position: 'absolute' }}
                    targetDate={item.targetDate}
                  />
                </Box>
                <Box padding={6} color="shader.a.100">
                  <Text lineHeight="1.5rem" fontWeight="medium">
                    {item.title}
                  </Text>
                  <Text color="shader.a.400" fontSize="sm" noOfLines={2} mb={4}>
                    {item.description}
                  </Text>
                  <HStack gap={2}>
                    <Text fontSize="sm" fontWeight="medium">
                      Reward
                    </Text>
                    <Box display="inline-flex" alignItems="center" gap={1}>
                      <Icon as={GafiIcon} h={4} w={4} />
                      <Text fontSize="sm" fontWeight="medium">
                        2,000 GAFI
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Carousel>
      </Box>
      <Box
        width="full"
        height="full"
        sx={{
          svg: {
            position: 'absolute',
            width: 'inherit',
            left: 0,
            bottom: 0,
          },
        }}
      >
        <BgGrid />
      </Box>
    </Box>
  );
};

export default GameEvent;
