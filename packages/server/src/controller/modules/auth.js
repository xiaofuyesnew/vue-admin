import { prisma } from '../../utils/index.js'

export default {
  'GET /auth/login': async (ctx) => {
    const users = await prisma.user.findMany()
    ctx.body = users
  },
}
