/* eslint-disable no-unused-vars */
//you can import boostrap or other stuff here.
// import '../../public/styles/home.css'
import "../../assets/styles.less";

// import App from "next/app";
import AppProvider from "../components/shared/AppProvider";
import { GlobalStyles } from "../components/styles/GlobalStyles";
import Head from "next/head";
import NProgress from "nprogress";
import Page from "../components/page";
import Router from "next/router";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

import { useStore } from '../redux/store'
import { Provider } from 'react-redux'


function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)

    //this file is useful when you have a global google tags, meta, icon etc.
    return (
        <Provider store={store}>
            <GlobalStyles />
            <Head>
                <meta
                    name="viewport"
                    content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
                />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <title>Next JS Boiler</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900|Anonymous+Pro:400,700&display=swap" rel="stylesheet" />
                {/* {pageProps.ieBrowser && (
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js" />
                )} */}

                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta charSet="utf-8" />
                <meta name="keywords" content="NextJs, Template, Boiler" />
                <meta name="description" content="NextJs Boiler template" />
                <meta property="og:description" content="NextJs Boiler template" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="author" content="Cecep Budiman" />
            </Head>
            <AppProvider>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </AppProvider>
        </Provider>
    )
}


export default MyApp;