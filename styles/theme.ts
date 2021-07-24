import { extendTheme, ThemeConfig } from "@chakra-ui/react";

/*******************************************************
 自定义 theme
 default theme: https://chakra-ui.com/docs/theming/theme
*******************************************************/

/**
 *  foundations
 *  https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/foundations
 */
const colors = {
  mycolor: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    // test: "#000000",
  },
};

const fonts = {
  body: `-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`,
  heading: `-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif`,
};

/**
 *  全局样式
 *  https://chakra-ui.com/docs/features/global-styles
 */
const styles = {
  // global styles
  global: {
    body: {
      fontFamily: "body",
      //   color: "mycolor.test",
    },
  },
};

/**
 *  component styles
 * https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/components
 *
 * 由 baseStyle, sizes, variants, defaultProps 组成
 *
 *   const ComponentStyle = {
 *       // style object for base or default style
 *       baseStyle: {},
 *       // styles for different sizes ("sm", "md", "lg")
 *       sizes: {},
 *       // styles for different visual variants ("outline", "solid")
 *       variants: {},
 *       // default values for `size` and `variant`
 *       defaultProps: {
 *           size: "",
 *           variant: "",
 *       },
 *   };
 */

const components = {
  Button: {},
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides = {
  colors,
  fonts,
  styles,
  components,
};

const theme = extendTheme(overrides);
export default theme;

export function themeHelp() {
  console.log("---- THEME HELP ----");
  console.log("w,h,minW,maxW,minH,maxH,boxSize -> theme.sizes");
  console.log(
    "margin, padding,top,right,bottom,left,grid-gap,grid-row-gap,grid-column-gap -> theme.space"
  );
  console.log(
    "color, bg, bgColor, borderColor,borderTopColor,borderBottomColor,borderRightColor,borderLeftColor borderStartColor-> theme.colors"
  );
  console.log("fontFamily -> theme.fonts");
  console.log("fontSize -> theme.fontSizes");
  console.log("fontWeight -> theme.fontWeights");
  console.log("lineHeight -> theme.lineHeights");
  console.log("letterSpacing -> theme.letterSpacings");
  console.log("border -> theme.borders");
  console.log("borderRadius,border**Radius -> theme.radii");
  console.log("zIndex -> theme.zIndices");
  console.log("textShadow,boxShadow -> theme.shadows");

  console.log("theme:", theme);
  console.log("--------------------");
}
