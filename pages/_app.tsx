import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { store } from 'presentation/app/store';
import AppThemeProvider from 'presentation/providers/app-theme-provider';
import { Provider } from 'react-redux';
import Notification from '../components/base/notification';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <>
          <CssBaseline />
          <Notification />
          <Component {...pageProps} />
        </>
      </AppThemeProvider>
    </Provider>
  );
}

export default MyApp;
