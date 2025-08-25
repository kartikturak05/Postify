import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { userRouter } from './Routes/user'
import {blogRouter} from './Routes/blog'
import { cors } from 'hono/cors'
import { Hono } from 'hono'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()
app.use('api/*',cors());
app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

app.use('/api/v1/blog/*', async (c:any, next:any) => {
  
  // Bearer token => ["Bearer","token"];

  const header = c.req.header('authorization') || "";
  const token = header.split("")[1];

  const resonse = await verify(token, c.env.JWT_SECRET)
  if (resonse.id) {
    next()
  } else {
    c.status(403)
    return c.json({ error: "unauthorized" })
  }
})



export default app