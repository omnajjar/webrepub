import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <title>WebRepub</title>
      <Head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
