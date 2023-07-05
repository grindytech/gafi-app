import { Box, Text, Image } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';

import { SwiperSlide } from 'swiper/react';

const TestData = [
  {
    image: 'https://cdn.nkstatic.com/videos-screenshots/BTD6/6.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    image: 'https://wotpack.ru/wp-content/uploads/2021/07/word-image-170.jpeg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    image:
      'https://didongviet.vn/dchannel/wp-content/uploads/2022/06/naruto-shippuden-ultimate-ninja-storm-3-full-burst-game-naruto-didongviet.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    image: 'https://cdn.nkstatic.com/videos-screenshots/BTD6/6.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
  {
    image: 'https://cdn.nkstatic.com/videos-screenshots/BTD6/6.jpg',
    name: 'Bloons TD 6',
    isVerified: true,
    creator: 'Ninja Kiwi',
    collection: '35',
    items: '9999',
    floor: '0.045',
    currency: 'GAFI',
  },
];
const NewRelease = () => {
  return (
    <Box>
      <Text
        color="shader.a.900"
        fontSize="2xl"
        fontWeight="bold"
        lineHeight="2"
      >
        New release
      </Text>
      <Box mt={4}>
        <Carousel
          options={{
            breakpoints: {
              360: {
                slidesPerView: 1,
              },
              630: {
                slidesPerView: 1.2,
              },
              920: {
                slidesPerView: 1.2,
              },

              1440: {
                slidesPerView: 2.2,
              },
            },
          }}
        >
          {TestData.map((item, index) => (
            <SwiperSlide key={index}>
              <Box borderRadius="lg">
                <Box width="full" padding={2} position="relative">
                  <Image
                    objectFit="cover"
                    src={item.image}
                    alt={`Image ${item.name}`}
                    width="full"
                    h="328px"
                    borderRadius="xl"
                    id="myImage"
                  />
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default NewRelease;
