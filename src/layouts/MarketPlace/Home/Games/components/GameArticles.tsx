import { Box, Text, Image, HStack, Icon, Heading } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import NextIcon from 'public/assets/line/chevron-01.svg';
import { Navigation, Mousewheel, Autoplay } from 'swiper';
import { DataTestArticle } from 'layouts/MarketPlace/Explorer/DataTest';

const GameArticles = () => {
  return (
    <>
      <Box>
        <Heading variant="sub01">Game Article</Heading>
        <Box mt={4}>
          <Carousel
            options={{
              modules: [Autoplay, Navigation, Mousewheel],
              autoplay: {
                delay: 1500,
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
          >
            {DataTestArticle.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  borderRadius="lg"
                  border="0.063rem solid"
                  borderColor="shader.a.300"
                >
                  <Box width="full" padding={2} position="relative">
                    <Image
                      objectFit="cover"
                      src={item.image}
                      alt={`Image ${item.title}`}
                      width="full"
                      h="15.125rem"
                      borderRadius="xl"
                    />
                  </Box>
                  <Box padding={6} color="shader.a.900">
                    <Text lineHeight={6} fontWeight="medium">
                      {item.title}
                    </Text>
                    <Text
                      color="shader.a.500"
                      fontSize="sm"
                      noOfLines={2}
                      mb={4}
                    >
                      {item.description}
                    </Text>
                    <HStack gap={0.5}>
                      <Text fontSize="sm" fontWeight="medium">
                        Read more
                      </Text>
                      <Icon
                        as={NextIcon}
                        color="primary.a.500"
                        transform="rotate(-90deg)"
                      />
                    </HStack>
                  </Box>
                </Box>
              </SwiperSlide>
            ))}
          </Carousel>
        </Box>
      </Box>
    </>
  );
};

export default GameArticles;
