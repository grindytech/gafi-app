import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";
import { forwardRef } from "react";

const MainPanel = forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  // @ts-ignore
  const { variant, children, ...rest } = props;
  const styles = useStyleConfig("MainPanel", { variant });
  // Pass the computed styles into the `__css` prop
  return (
    <Box __css={styles} {...rest} ref={ref}>
      {children}
    </Box>
  );
});

export default MainPanel;
