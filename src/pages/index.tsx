/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery(
    {
      text: "from tRPC",
    },
    {
      context: {
        // @ts-ignore
        useBatch: true,
      },
    }
  );

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-full flex-1 flex-col items-center justify-center text-white">
        <h1 className="text-2xl">Fullstack Auth Template</h1>
      </main>
    </>
  );
};

export default Home;
