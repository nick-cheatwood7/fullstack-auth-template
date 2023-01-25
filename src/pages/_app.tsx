import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type AppType } from "next/app";

import { api } from "../utils/api";

import Navbar from "../components/common/Navbar";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <div id="content" className="flex h-screen flex-col">
      <Navbar />
      <div className="h-full w-screen bg-gray-900 font-sans text-sm">
        <Component {...pageProps} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
};

export default api.withTRPC(MyApp);
