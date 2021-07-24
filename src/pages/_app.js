//you can import boostrap or other stuff here.
import 'bootstrap/dist/css/bootstrap.css';
import '../../public/styles/home.css'
import { useStore } from '../redux/store'
import { Provider } from 'react-redux'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)
    
    //this file is useful when you have a global google tags, meta, icon etc.
    return (
        <Provider store={store}>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

                <meta charSet="utf-8" />
                <meta name="keywords" content="NextJs, Template, Boiler" />
                <meta name="description" content="NextJs Boiler template" />
                <meta property="og:description" content="NextJs Boiler template" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="author" content="Cecep Budiman" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp