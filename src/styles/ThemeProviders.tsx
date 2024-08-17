"use client";
import { useAppSelector } from "@/hooks/useHook";
import { selectAppConfig } from "@/store/global/global.selector";
import { themeOption } from "@/styles/theme.config";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  Palette,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material/styles";
import { useEffect, useState } from "react";

export const ThemeProviders = (props: React.PropsWithChildren) => {
  const [themeOptions, setThemeOptions] = useState(themeOption);
  const appConfig = useAppSelector(selectAppConfig);
  const { themeConfig } = appConfig;

  useEffect(() => {
    setThemeOptions({ ...themeOption, palette: themeConfig as any });
  }, [themeConfig]);

  return (
    <ThemeProvider theme={createTheme(themeOptions as unknown as ThemeOptions)}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};
