export const __prod__ = process.env.NODE_ENV === "production";
export const __test__ = process.env.NODE_ENV === "test";
export const redisSessionPrefix = "sess:";
export const redisUserSessionIdPrefix = "userSessID:";
export const redisEmailVerifyPrefix = "everif:";
export const redisPassChangePrefix = "passchange:";
