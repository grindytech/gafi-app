import { Box, Heading } from '@chakra-ui/react';
import { SwiperSlide } from 'swiper/react';
import Carousel from 'components/Carousel/Carousel';
import CardTypeOne from 'components/ProductCard/CardTypeOne';
import { TestData } from '../HomeTopAdventure';

export default function HomeTopFightGame() {
  return (
    <Box>
      <Heading variant="sub01" mb={4}>
        Top Fight Games
      </Heading>

      <Carousel>
        {TestData.map(item => (
          <SwiperSlide key={item.id}>
            <CardTypeOne item={item} />
          </SwiperSlide>
        ))}
      </Carousel>
    </Box>
  );
}
