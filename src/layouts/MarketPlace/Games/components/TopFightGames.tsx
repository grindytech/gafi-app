import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { SwiperSlide } from 'swiper/react';
import Carousel from 'components/Carousel/Carousel';
import CardTypeOne from 'components/ProductCard/CardTypeOne';
import { TestData } from './TopAdventureGame';
const TopFightGames = () => {
  return (
    <>
      <Box>
        <Text
          mb={4}
          color="shader.a.900"
          fontSize="xl"
          fontWeight="semibold"
          lineHeight="1.5rem"
        >
          Top Fight Games
        </Text>

        <Carousel>
          {TestData.map(item => (
            <SwiperSlide key={item.id}>
              <CardTypeOne item={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default TopFightGames;
