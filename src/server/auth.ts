import type { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";
import { __prod__ } from "../utils/constants";

const ironOptions: IronSessionOptions = {
  cookieName: "qid",
  password: "JLCMx+oVZUozQf1xeoBOxoLORH5Ajj5Iur76ycppknM=",
  cookieOptions: {
    httpOnly: true,
    secure: __prod__,
    sameSite: "lax",
    path: "/",
    maxAge: undefined, // expire with browser session
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, ironOptions);
}
