import { Express, Request } from "express";
import { OAuth2Client } from "google-auth-library";
import { login } from "../utils/login";
import { sendCookieToken, signToken } from "../utils/signToken";

export const installGoogleOAuth = (app: Express) => {
  app.post("/auth/google/authenticate", async (req: Request, res, next) => {
    const rootPgPool = app.get("rootPgPool");
    const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

    console.log("req.query.token", req.query.token);
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.query.token as string,
        audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        throw new Error("No payload found");
      }
      const userid = payload["sub"];
      /* 

  f_user_id uuid,
  f_service character varying,
  f_identifier character varying,
  f_profile json,
  f_auth_details json
  */
      try {
        const {
          rows: [user],
        } = await rootPgPool
          .query(
            `with my_user as ( select * from priv.link_or_register_user($1, $2, $3, $4, $5)), new_session as (
              insert into priv.sessions (user_id)
              select id from my_user
              returning *
            )
            select my_user.id as user_id, new_session.uuid as session_id
            from my_user, new_session`,
            [
              null,
              "google",
              userid,
              JSON.stringify({
                lastname: payload["given_name"],
                firstname: payload["family_name"],
                avatar_url: payload["picture"],
                email: payload["email"],
              }),
              JSON.stringify({
                iat: payload["iat"],
                exp: payload["exp"],
                accessToken: req.query.token,
              }),
            ]
          )
          .catch((e: any) => {
            return res.status(500).send({
              ok: false,
              error: e.message,
              code: "FFFFF",
              message: "Registration failed",
              details: e.detail,
              hint: e.hint,
              sql: e.sql,
            });
          });

        console.log("user", user);
        if (!user || !user.user_id) {
          const e = new Error("Registration failed");
          (e as any)["code"] = "FFFFF";
          throw e;
        } else {
          const { accessToken, refreshToken } = await login({
            payload: {
              userId: user.user_id,
              sessionId: user.session_id,
            },
            pool: rootPgPool,
            res,
          });

          console.log("accessToken", accessToken);

          return res.status(200).send({
            ok: true,
            user_id: user.id,
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        }
      } catch (error) {
        return;
      }
    }
    verify().catch(console.error);
  });
};
