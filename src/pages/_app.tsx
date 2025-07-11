import { AuthProvider } from "@/components/context/AuthContext";
import { SessionProvider } from "next-auth/react";
import { FeedbackProvider } from "@/components/context/FeedbackContext";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from 'nprogress'; 
import "@/styles/globals.css";

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  Router.events.on("routeChangeStart", () => {
    NProgress.start()
  })

  Router.events.on("routeChangeComplete", () => {
    NProgress.done()
  })
  Router.events.on("routeChangeError", () => {
    NProgress.done()
  })
  return <SessionProvider session={session}>
    <AuthProvider>
      <FeedbackProvider>
        <Component {...pageProps} />;
      </FeedbackProvider>
    </AuthProvider>
  </SessionProvider>
}
