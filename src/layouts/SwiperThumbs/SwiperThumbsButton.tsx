import { ButtonProps, Icon, IconButton } from '@chakra-ui/react';
import Chevron01Icon from 'public/assets/line/chevron-01.svg';
import { Swiper as SwiperType } from 'swiper/types';

interface SwiperThumbsButtonProps {
  swiperRef: React.MutableRefObject<SwiperType | undefined>;
  sx?: ButtonProps;
}

export default function SwiperThumbsButton({
  swiperRef,
  sx,
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
            position="absolute"
            zIndex="docked"
            bg="white"
            color="primary.a.500"
            borderRadius="full"
            transitionDuration="ultra-slow"
            boxShadow="0px 0px 0.625rem 0px rgba(0, 0, 0, 0.15)"
            icon={<Icon as={Chevron01Icon} width={6} height={6} />}
            _groupHover={{
              opacity: 1,
              pointerEvents: 'unset',
            }}
            onClick={() => {
              if (isNext) {
                return swiperRef.current?.slideNext();
              }

              return swiperRef.current?.slidePrev();
            }}
            inset={isNext ? '50% 0 auto auto' : '50% auto auto 0'}
            transform={
              isNext
                ? 'translate(-25%, -50%) rotate(-90deg)'
                : 'translate(25%, -50%) rotate(90deg)'
            }
            {...sx}
          />
        );
      })}
    </>
  );
}
