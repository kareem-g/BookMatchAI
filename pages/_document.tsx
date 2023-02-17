import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Customized book suggestions powered by AI."
        />
        <meta property="og:site_name" content="bookmatch-ai.vercel.app" />
        <meta
          property="og:description"
          content="Customized book suggestions powered by AI."
        />
        <meta
          property="og:title"
          content="Customized book suggestions powered by AI."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Book Recommendation Generator" />
        <meta
          name="twitter:description"
          content="Customized book suggestions powered by AI."
        />
        <meta property="og:image" content="/public/og-image.png" />
        <meta name="twitter:image" content="/public/og-image.png" />
      </Head>
      <body>
        <Main />
        <script
          async
          defer
          data-website-id="fd6f9390-bf5a-4762-b373-6adb5ba56375"
          src="https://my-blog-analytics.vercel.app/umami.js"
        ></script>
        <NextScript />
      </body>
    </Html>
  );
}
