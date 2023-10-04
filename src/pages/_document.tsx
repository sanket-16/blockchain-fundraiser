import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="w-full grid place-content-center">
        <main className="max-w-screen-2xl min-w-[1280px]">
          <Main />
        </main>
        <NextScript />
      </body>
    </Html>
  );
}
