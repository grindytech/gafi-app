import { Box, Heading } from '@chakra-ui/react';
import Carousel from 'components/Carousel/Carousel';
import { SwiperSlide } from 'swiper/react';
import CardTypeOne from 'components/ProductCard/CardTypeOne';
import { TestPropsType1 } from 'layouts/MarketPlace/Explorer/DataTest';

export const TestData: TestPropsType1[] = [
  {
    image:
      'https://i.seadn.io/gcs/files/8ecb630ead777f0a6eeb40de1fb22b83.png?auto=format&dpr=1&w=1920',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    id: '18',
  },
  {
    image:
      'https://cdn.dribbble.com/users/383277/screenshots/18055765/media/e5fc935b60035305099554810357012a.png',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    id: '17',
  },
  {
    image:
      'https://cdn.akamai.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',

    id: '16',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',

    id: '15',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '14',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',
    isVerified: true,
    id: '13',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',

    id: '12',
  },
  {
    image:
      'https://i.seadn.io/gcs/files/bbaf43ee4a02d5affb7e8fc186d0bdb5.png?auto=format&dpr=1&w=256',
    name: 'Bigwhale52',
    floor: '0.05',
    volume: '1,930',

    id: '3',
  },
];
const TopAdventureGame = () => {
  return (
    <>
      <Box>
        <Heading variant="sub01" mb={4}>
          Top Adventure Games
        </Heading>

        <Carousel>
          {TestData.map(item => (
            <SwiperSlide key={item.id}>
              <CardTypeOne item={item} link={`/marketplace/game/${item.id}`} />
            </SwiperSlide>
          ))}
        </Carousel>
      </Box>
    </>
  );
};

export default TopAdventureGame;
