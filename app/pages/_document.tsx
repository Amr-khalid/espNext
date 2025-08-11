import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* رابط manifest */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
        {/* أيقونة التطبيق */}
        <link rel="apple-touch-icon" href="/next.svg" />
        {/* اللون الأساسي للتطبيق */}
        <meta name="theme-color" content="#000000" />
        {/* نوع عرض التطبيق */}
        <meta name="mobile-web-app-capable" content="yes" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
