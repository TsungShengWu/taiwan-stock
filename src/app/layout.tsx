import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { Experimental_CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

export const metadata: Metadata = {
  title: 'Taiwan Stock',
  description: 'A simple website for browsing Taiwan stock.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>
        <AppRouterCacheProvider>
          <Experimental_CssVarsProvider theme={theme} defaultMode="system">
            <CssBaseline />
            {children}
          </Experimental_CssVarsProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
