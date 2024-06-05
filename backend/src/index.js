import { verify } from 'hono/jwt';
import { userRouter } from './Routes/user';
import { blogRouter } from './Routes/blog';
import { Hono } from 'hono';
const app = new Hono();
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
app.use('/api/v1/blog/*', async (c, next) => {
    // Bearer token => ["Bearer","token"];
    const header = c.req.header('Authorization') || "";
    const token = header.split("")[1];
    const resonse = await verify(token, c.env.JWT_SECRET);
    if (resonse.id) {
        next();
    }
    else {
        c.status(403);
        return c.json({ error: "unauthorized" });
    }
});
export default app;
