import jwtPkg, { JwtPayload } from "jsonwebtoken";
import { Express } from "express";
import { login } from "../utils/login";
const { verify } = jwtPkg;

export const installJWTRefresh = (app: Express) => {
  app.post("/access_token", async (req, res, _next) => {
    const rootPgPool = app.get("rootPgPool");
    const refreshToken = req.cookies.qid;

    if (refreshToken) {
      try {
        const payload = verify(refreshToken, process.env.JWT_SECRET!, {
          algorithms: ["HS256"],
        }) as JwtPayload;

        // user lookup - if user was deleted, they no longer get a token
        const { rows } = await rootPgPool.query(
          ` SELECT uuid as session_id, user_id AS sub FROM priv.sessions 
            WHERE uuid = $1
            LIMIT 1
          `,
          [payload?.session_id]
        );

        if (rows.length) {
          const { sub, session_id } = rows[0];
          // go ahead and refresh refresh token while we're here
          const { accessToken, refreshToken } = await login({
            payload: {
              sessionId: session_id,
              userId: sub,
            },
            pool: rootPgPool,
            res,
          });
          return res.send({
            ok: true,
            accessToken,
            refreshToken,
          });
        }
      } catch (err) {
        console.error(err);
        return res
          .status(401)
          .send({ ok: false, accessToken: "", refreshToken: "" });
      }
    }

    return res.send({ ok: false, accessToken: "", refreshToken: "" });
  });
};
