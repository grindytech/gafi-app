import { motionVariantsProps } from 'types/variant';

export const convertHex = (color: string, opacity: number) => {
  /* 
    - https://stackoverflow.com/a/7018987/16151303
    - logic summary:
        get position elements necessary 
        convert to 'base 16'
        the latest adding alpha  
  */
  const hexColorToRGBA = `
      ${parseInt(color.substring(1, 3), 16)},
      ${parseInt(color.substring(3, 5), 16)},
      ${parseInt(color.substring(5, 7), 16)}, ${opacity}`;

  return `rgba(${hexColorToRGBA})`;
};

export const motionVariants = ({
  initialY,
  whileInViewY,
  delay,
  margin,
  duration,
}: motionVariantsProps) => ({
  initial: {
    opacity: 0,
    transform: initialY,
  },
  whileInView: {
    opacity: 1,
    transform: whileInViewY,
    transition: {
      duration: duration || 2,
      delay,
      type: 'spring',
    },
  },
  viewport: { once: true, margin },
});
