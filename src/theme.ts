'use client';

import { experimental_extendTheme, useTheme } from '@mui/material';

const theme = experimental_extendTheme();

export function useCustomTheme() {
  return useTheme<typeof theme>();
}

export default theme;
