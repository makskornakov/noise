import Playground from '@/components/Playground';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Canvas Playground</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Canvas Playground" />
      </Head>
      <main>
        <h1>Canvas Playground</h1>
        <a href="/play">Enter the Playground</a>
      </main>
    </>
  );
}
