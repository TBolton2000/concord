import bodyParser from 'body-parser';
import { Router } from 'express';
import { verify } from 'jsonwebtoken';
import { createAccessToken, createRefreshToken } from '../auth';
import { User } from '../entity/User';
import { sendRefreshToken } from '../sendRefreshToken';

export function apiRouter() {
  const router = Router();

  router.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
        return res.send({ ok: false, accessToken: ""});
    }

    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, accessToken: ""});
    }
    const user = await User.findOne({id: payload.userId});

    if (!user) {
        return res.send({ ok: false, accessToken: ""});
    }

    if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user)});
})

  return router;
}
