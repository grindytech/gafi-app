import { IconButton } from '@chakra-ui/react';
import Chevron01Icon from 'public/assets/line/chevron-01.svg';
import { Swiper as SwiperType } from 'swiper/types';

interface SwiperThumbsButtonProps {
  swiperRef: React.MutableRefObject<SwiperType | undefined>;
}

export default function SwiperThumbsButton({
  swiperRef,
}: SwiperThumbsButtonProps) {
  return (
    <>
      {['previous', 'next'].map(meta => {
        const isNext = meta === 'next';

        return (
          <IconButton
            opacity={0}
            pointerEvents="none"
            key={meta}
            aria-label={meta}
            variant="unstyled"
            display="flex"
            color="shader.a.900"
            position="absolute"
            zIndex="docked"
            bg="white"
            borderRadius="full"
            transitionDuration="ultra-slow"
            icon={<Chevron01Icon />}
            _groupHover={{
              opacity: 1,
              pointerEvents: 'unset',
            }}
            onClick={() => {
              if (isNext) {
                return swiperRef.current?.slideNext();
              }

              swiperRef.current?.slidePrev();
            }}
            inset={isNext ? '50% 0 auto auto' : '50% auto auto 0'}
            transform={
              isNext
                ? 'translate(-25%, -50%) rotate(-90deg)'
                : 'translate(25%, -50%) rotate(90deg)'
            }
          />
        );
      })}
    </>
  );
}
