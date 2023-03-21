import Head from 'next/head';

import Example from '../../components/example/Example';
export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>웹 어드민 렛츠고.</h1>
      <Example />
    </>
  );
}
