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
