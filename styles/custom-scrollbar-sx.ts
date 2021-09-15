/**
 *  set customScrollBarSX to sx property of container
 *  sx={customScrollBarSX}
 */
export const customScrollBarSX = {
  '&::-webkit-scrollbar': {
    width: '20px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '20px',
    border: '6px solid transparent',
    backgroundClip: 'content-box',
    backgroundColor: '#a8bbbf',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'primary',
  },
};
