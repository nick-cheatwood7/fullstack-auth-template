import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "../utils/api";

import Navbar from "../components/common/Navbar";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div id="content" className="flex h-screen flex-col">
        <Navbar />
        <div className="h-full w-screen bg-gray-900 font-sans text-sm">
          <Component {...pageProps} />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
