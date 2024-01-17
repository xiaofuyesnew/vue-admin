import { join } from 'node:path'
import { cwd, env } from 'node:process'

import Koa from 'koa'
import responseTime from 'koa-response-time'
import koaStatic from 'koa-static'
import error from 'koa-json-error'
import bodyParser from '@koa/bodyparser'
import jwt from 'koa-jwt'

import controller from './controller/index.js'
import { log } from './utils/index.js'

const port = env.PORT || 5175

const secret = env.JWT_SECRET || 'default_secret'

const app = new Koa()

app
  .use(responseTime())
  .use(error())
  .use(koaStatic(join(cwd(), 'static')))
  .use(bodyParser())
  .use(
    jwt({
      secret,
      cookie: 'Authorization',
      debug: env.NODE_ENV === 'development',
    })
      .unless({
        path: [
          '/auth/login',
        ],
      }),
  )
  .use(controller())
  .listen(port, () => log(`Server start, listening port ${port}`))