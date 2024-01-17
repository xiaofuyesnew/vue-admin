import { env } from 'node:process'

import sign from 'jsonwebtoken/sign.js'
import verify from 'jsonwebtoken/verify.js'

export const secret = env.JWT_SECRET || 'default_secret'

export const expiresIn = '24h'

export const generateToken = userInfo => sign(userInfo, secret, { expiresIn })

export const verifyToken = ctx => verify(ctx.request.headers.authorization.split(' ')[1], secret)
