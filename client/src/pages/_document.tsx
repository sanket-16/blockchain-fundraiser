import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>FundMe</title>
      </Head>
      <body className="w-full grid place-content-center">
        <main className="max-w-screen-2xl md:min-w-[1280px] min-w-[200px] md:px-16">
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
