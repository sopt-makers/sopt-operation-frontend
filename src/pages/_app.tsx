import '@sopt-makers/ui/dist/index.css';

import { Global, ThemeProvider } from '@emotion/react';
import { ToastProvider } from '@sopt-makers/ui';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';

import Layout from '@/components/common/Layout';
import { AdminStatusProvider } from '@/components/devTools/AdminContextProvider';
import global from '@/styles/global';
import theme from '@/styles/theme';
import { getToken } from '@/utils/auth';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!getToken('ACCESS')) {
      router.replace('/');
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_API_URL !== 'PRODUCTION'
            ? '[DEV] SOPT Admin'
            : 'SOPT Admin'}
        </title>
      </Head>
      <QueryClientProvider client={client}>
        <AdminStatusProvider>
          <Hydrate state={pageProps.dehydratedState}>
            <RecoilRoot>
              <ThemeProvider theme={theme}>
                <ToastProvider>
                  <Global styles={global} />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </ToastProvider>
              </ThemeProvider>
            </RecoilRoot>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </AdminStatusProvider>
      </QueryClientProvider>
    </>
  );
}
