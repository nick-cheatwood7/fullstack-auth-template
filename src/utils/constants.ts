import { env } from "../env/server.mjs";
export const __prod__ = env.NODE_ENV === "production";
