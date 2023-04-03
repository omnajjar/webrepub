import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  const socialImageURL = `${process.env.NEXT_PUBLIC_HOST}/images/webrepub-social.png`;
  return (
    <Html lang='en'>
      <title>WebRepub</title>
      <Head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <meta name='title' content='WebRepub' />
        <meta
          name='description'
          content='Webrepub is an open source web page editor 🚀 powered🔋 by React ✨ and Styled Components 💅. Our mission is to create a powerful React page editor that supports different presets of modern and popular components and design libraries that will make web development much faster and more fun.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://webrepub.com/' />
        <meta property='og:title' content='WebRepub' />
        <meta
          property='og:description'
          content='Webrepub is an open source web page editor 🚀 powered🔋 by React ✨ and Styled Components 💅. Our mission is to create a powerful React page editor that supports different presets of modern and popular components and design libraries that will make web development much faster and more fun.'
        />
        <meta property='og:image' content={socialImageURL} />

        <meta property='twitter:card' content={socialImageURL} />
        <meta property='twitter:url' content='https://webrepub.com/' />
        <meta property='twitter:title' content='WebRepub' />
        <meta
          property='twitter:description'
          content='Webrepub is an open source web page editor 🚀 powered🔋 by React ✨ and Styled Components 💅. Our mission is to create a powerful React page editor that supports different presets of modern and popular components and design libraries that will make web development much faster and more fun.'
        />
        <meta property='twitter:image' content={socialImageURL} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
