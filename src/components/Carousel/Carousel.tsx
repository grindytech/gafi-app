import React, { useRef } from 'react';
import NextIcon from 'public/assets/line/chevron-01.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Box, Button, Icon } from '@chakra-ui/react';
/* import { SwiperOptions } from 'swiper/types/swiper-options.d.ts'; */
// eslint-disable-next-line import/no-unresolved
import { SwiperOptions } from 'swiper/types';
/* // eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation'; */

interface IProps {
  children: React.ReactNode;
  breakPointCustom?: SwiperOptions['breakpoints'];
}
const Carousel = ({ children, breakPointCustom }: IProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Box position="relative">
        <Swiper
          // install Swiper modules
          spaceBetween={20}
          slidesPerView={4}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current!,
            nextEl: nextRef.current!,
          }}
          onInit={swiper => {
            //  @typescript-eslint/ban-ts-comment
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            setTimeout(() => {
              // Override prevEl & nextEl now that refs are defined
              //  @typescript-eslint/ban-ts-comment
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = prevRef.current;
              //  @typescript-eslint/ban-ts-comment
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = nextRef.current;

              // Re-init navigation
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          breakpoints={
            breakPointCustom
              ? breakPointCustom
              : {
                  360: {
                    slidesPerView: 1,
                  },
                  630: {
                    slidesPerView: 2,
                  },
                  920: {
                    slidesPerView: 3,
                  },

                  1440: {
                    slidesPerView: 4,
                  },
                }
          }
          style={{
            position: 'relative',
          }}
        >
          {children}
        </Swiper>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          position="absolute"
          sx={{
            top: '50%',
            zIndex: 10,
          }}
        >
          <Button
            ref={prevRef}
            variant="navigation"
            sx={{
              left: '-20px',
            }}
          >
            <Icon
              as={NextIcon}
              height={6}
              w={6}
              transform="rotate(90deg)"
              color="primary.a.500"
            />
          </Button>
          <Button
            ref={nextRef}
            variant="navigation"
            sx={{
              right: '-20px',
            }}
          >
            <Icon
              as={NextIcon}
              height={6}
              w={6}
              transform="rotate(-90deg)"
              color="primary.a.500"
            />
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Carousel;
