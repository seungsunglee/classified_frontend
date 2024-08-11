import React, { useEffect } from 'react'

import Head from 'next/head'
import Script from 'next/script'

import { CacheProvider } from '@emotion/react'
import { DefaultSeo } from 'next-seo'
import { ToastContainer } from 'react-toastify'
import { SWRConfig } from 'swr'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import 'react-toastify/dist/ReactToastify.css'

import api from '@/lib/api'
import * as gtag from '@/lib/gtag'

import useScrollRestoration from '@/hooks/useScrollRestoration'

import { DirectProvider } from '@/contexts/DirectContext'
import { HistoryProvider } from '@/contexts/HistoryContext'

import createEmotionCache from '../../src/createEmotionCache'
import theme from '../../src/theme'
import '../../src/globals.css'

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props

  useScrollRestoration(router)

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SWRConfig
            value={{
              fetcher: (url) => api.get(url).then((res) => res.data),
              revalidateIfStale: false,
              revalidateOnFocus: false,
              revalidateOnReconnect: false,
              shouldRetryOnError: false,
            }}
          >
            <HistoryProvider>
              <DirectProvider>
                <DefaultSeo
                  title={undefined}
                  titleTemplate='%s | Telopea'
                  defaultTitle='Telopea - オーストラリアの生活情報ウェブサイト'
                  description='オーストラリアの生活情報ウェブサイト - Telopea。求人情報、不動産、中古品売買などの募集広告を無料で掲載できます。オーストラリアのローカル情報が満載。'
                  canonical={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    router.asPath.split('?')[0]
                  }
                  openGraph={{
                    type: 'article',
                    locale: 'ja_JP',
                    images: [
                      {
                        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og_image.jpg`,
                      },
                    ],
                    site_name: 'Telopea',
                  }}
                  twitter={{
                    cardType: 'summary_large_image',
                  }}
                />
                <Component {...pageProps} />
                <ToastContainer
                  position='bottom-left'
                  hideProgressBar
                  limit={3}
                />
              </DirectProvider>
            </HistoryProvider>
          </SWRConfig>
        </ThemeProvider>
      </CacheProvider>
    </>
  )
}
