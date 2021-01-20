import { useMediaQuery, useTheme } from '@material-ui/core';

export const useIsXSDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('xs'));
};

export const useIsSMDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));
};

export const useIsMDDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('md'));
};

export const useIsLGDown = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('lg'));
};

export const useIsSMup = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('sm'));
};

export const useIsMDup = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('md'));
};

export const useIsLGup = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('lg'));
};

export const useIsXLup = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('xl'));
};
