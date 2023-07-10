import { Box, Text, Image, HStack, Icon, Heading } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import NextIcon from 'public/assets/line/chevron-01.svg';

import TimeReminder from 'components/Time/TimeReminder';
export const DataTestArticle = [
  {
    image:
      'https://cdn1.epicgames.com/offer/fn/EN_25BR_ZeroBuild_EGS_2560x1440_2560x1440-ce5c18ffe40b92cb6e3c8dac19dfd001',
    link: '#',
    title: 'Fornite Zero Build Give Away',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://bfs3bucket.s3.amazonaws.com/wp-content/uploads/2023/06/LEGO-2K-Drive-Season-1-key-art-featured-800x445.jpg',
    link: '#',
    title: 'Lego 2K Driver Season 1',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://cdn1.epicgames.com/offer/fn/EN_25BR_ZeroBuild_EGS_2560x1440_2560x1440-ce5c18ffe40b92cb6e3c8dac19dfd001',
    link: '#',
    title: 'Fornite Zero Build Give Away',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://bfs3bucket.s3.amazonaws.com/wp-content/uploads/2023/06/LEGO-2K-Drive-Season-1-key-art-featured-800x445.jpg',
    link: '#',
    title: 'Lego 2K Driver Season 1',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://cdn1.epicgames.com/offer/fn/EN_25BR_ZeroBuild_EGS_2560x1440_2560x1440-ce5c18ffe40b92cb6e3c8dac19dfd001',
    link: '#',
    title: 'Fornite Zero Build Give Away',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
  {
    image:
      'https://bfs3bucket.s3.amazonaws.com/wp-content/uploads/2023/06/LEGO-2K-Drive-Season-1-key-art-featured-800x445.jpg',
    link: '#',
    title: 'Lego 2K Driver Season 1',
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type...",
  },
];
const GameArticles = () => {
  return (
    <>
      <Box>
        <Heading variant="sub01">Game Article</Heading>
        <Box mt={4}>
          <Carousel
            options={{
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
                      h="242px"
                      borderRadius="xl"
                    />
                    <TimeReminder sx={{ position: 'absolute' }} />
                  </Box>
                  <Box padding={6} color="shader.a.900">
                    <Text lineHeight="1.5rem" fontWeight="medium">
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
