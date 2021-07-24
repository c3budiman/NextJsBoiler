import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  //this file is useful when you have a global google tags, meta, icon etc.
  render() {
    return (
      <Html lang="en">
        <Head>
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument