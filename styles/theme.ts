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
    test: "#000000",
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
      color: "mycolor.test",
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

/**
 *
 */

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

/*

Pseudo
-----
  <Box
    _hover={{ fontWeight: 'semibold' }}
    _groupHover={{ color: 'tomato' }}
  >
-----

_hover	:hover,
[data-hover]	
_active	:active,
[data-active]	
_focus	:focus,
[data-focus]	
_highlighted	[data-highlighted]	
_focusWithin	:focus-within	
_focusVisible	:focus-visible	
_disabled	[disabled],
[aria-disabled=true],
[data-disabled]	
_readOnly	[aria-readonly=true],
[readonly],
[data-readonly]	
_before	::before	
_after	::after	
_empty	:empty	
_expanded	[aria-expanded=true],
[data-expanded]	
_checked	[aria-checked=true],
[data-checked]	
_grabbed	[aria-grabbed=true],
[data-grabbed]	
_pressed	[aria-pressed=true],
[data-pressed]	
_invalid	[aria-invalid=true],
[data-invalid]	
_valid	[data-valid],
[data-state=valid]	
_loading	[data-loading],
[aria-busy=true]	
_selected	[aria-selected=true],
[data-selected]	
_hidden	[hidden],
[data-hidden]	
_autofill	:-webkit-autofill	
_even	:nth-of-type(even)	
_odd	:nth-of-type(odd)	
_first	:first-of-type	
_last	:last-of-type	
_notFirst	:not(:first-of-type)	
_notLast	:not(:last-of-type)	
_visited	:visited	
_activeLink	[aria-current=page]	
_activeStep	[aria-current=step]	
_indeterminate	:indeterminate,
[aria-checked=mixed],
[data-indeterminate]	
_groupHover	[role=group]:hover &,
[role=group][data-hover] &	
_groupFocus	[role=group]:focus &,
[role=group][data-focus] &	
_groupActive	[role=group]:active &,
[role=group][data-active] &	
_groupDisabled	[role=group]:disabled &,
[role=group][data-disabled] &	
_groupInvalid	[role=group][data-invalid] &	
_groupChecked	[role=group][data-checked] &	
_placeholder	::placeholder	
_fullScreen	:fullscreen	
_selection	::selection	
*/

/*
as

<Button as="a" target="_blank" variant="outline" href="https://chakra-ui.com">
  Hello
</Button>
*/

const overrides = {
  colors,
  fonts,
  styles,
  components,
};

const theme = extendTheme(overrides);
export default theme;

export function help() {
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
