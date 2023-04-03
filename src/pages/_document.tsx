import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <title>WebRepub</title>
      <Head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <meta
          name='title'
          content='Open source web page editor using React and  Styled Components 🚀'
        />
        <meta
          name='description'
          content='Webrepub is an open source web page editor 🚀 powered🔋 by React ✨ and Styled Components 💅. Our mission is to create a powerful React page editor that supports different presets of modern and popular components and design libraries that will make web development much faster and more fun.'
        />
        <meta
          name='keywords'
          content='webrepub,react,reactjs,styledcomponent,styled-component,page-editor, website-builder,website-generator,design'
        />
        <meta name='robots' content='index, follow' />
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
        <meta name='revisit-after' content='1 days' />
        <meta name='author' content='Osama Mohammad Najjar' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
