import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "../../../env/server.mjs";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";
import { withSessionRoute } from "../../../server/auth";

// export API handler
const trpcHandler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});

// Wrap with iron session
export default withSessionRoute(trpcHandler);
// export default withIronSessionApiRoute(trpcHandler, (req, res) => {
//   // Infer max cookie age from request
//   let rememberMe = false;
//   if (req.url?.includes("/auth.login")) {
//     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//     // @ts-ignore
//     const value = (req.body as unknown as Record<string, any>)["0"]?.["json"]?.[
//       "rememberMe"
//     ];
//     if (typeof value === "boolean" && value === true) {
//       rememberMe = value;
//     }
//   }
//   const maxCookieAge = rememberMe ? 1000 * 60 * 60 * 24 * 14 : undefined;
//   return {
//     ...ironOptions,
//     cookieOptions: {
//       maxAge: maxCookieAge,
//     },
//   } satisfies IronSessionOptions;
// });
