import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signupInput, signinInput } from "@kartikturak05/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
};
}>();

userRouter.use("/UserDetails", async (c, next) => {
    // extract the user id
    // and passed it down to the route handler
    const Authheader = c.req.header("Authorization") || "";
    console.log(Authheader);
    const token = Authheader;
    console.log("secret "+c.env.JWT_SECRET)
    try {
        const user = await verify(token, c.env.JWT_SECRET) as { id?: string };
        console.log("user"+user.id)
        if (user.id) {
            c.set("userId", user.id);
        console.log("user1"+user.id)

            await next();
        } else {
            c.status(403);
            c.json({
                message: "You are not logged in"
            })
        }
    } catch (err) {
        return c.json({
            message: "You are not logged in!",
        })
    }
})

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "inputs are not correct",
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.text(token);
  } catch (error) {
    c.status(403);
    return c.json({ error: "error while signup" });
  }
}); 

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "inputs are not correct",
    });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.text(jwt);
  } catch (err) {
    c.status(403);
    return c.json({ error: "error while signin", errpor: err });
  }
});

userRouter.get('/UserDetails',async(c)=> {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const Authheader = c.req.header("Authorization") || "";
  const userId = c.get("userId");

  try {
    const user = await prisma.user.findUnique({
      where:{
        id:userId
      }
    });
    return c.json(user);
  } catch (error) {
    alert('Invalid'); 
    console.log('Invalid');
  }
})