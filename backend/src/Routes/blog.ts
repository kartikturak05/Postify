import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInputs, updateBlogInputs } from "@kartikturak05/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    };
}>();

type User = {
    id: string;
};

function getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}


blogRouter.use("/*", async (c, next) => {
    const Authheader = c.req.header("Authorization") || "";
    const token = Authheader;
    try {
        const user = await verify(token, c.env.JWT_SECRET) as User;
        if (user.id) {
            c.set("userId", user.id);
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

blogRouter.post('/', async (c) => {
    const date = getFormattedDate();
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const userId = await c.get("userId");

    const { success } = createBlogInputs.safeParse(body)
    if (!success) {
        c.status(411);
        return c.json({
            message: "inputs are not correct"
        })
    }

    try {
        const response = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                publishedDate:date,
                authorId: userId

            }
        })
        return c.json({
            id: response.id,
        })
    } catch (err) {
        c.status(403);
        return c.json({ error: "Something went wrong !!" })
    }
})

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const { success } = updateBlogInputs.safeParse(body)
    if (!success) {
        c.status(411);
        return c.json({
            message: "inputs are not correct"
        })
    }
    try {
        const response = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
        return c.json({
            id: response.id,
        })
    } catch (err) {
        c.status(403);
        return c.json({ error: "Something went wrong !! " })
    }
})



// Todo:add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const response = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                publishedDate:true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({
            response
        })
    } catch (err) {
        c.status(403);
        return c.json({ error: "Something went wrong !!" })
    }
})


blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    // const userid = c.get("userId");

    try {
        const response = await prisma.post.findFirst({
            where: {
                id: id
            }, select: {
                id: true,
                title: true,
                content: true,
                publishedDate:true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return c.json({
            response
        })
    } catch (err) {
        c.status(403);
        return c.json({ error: "Something went wrong !!" })
    }
})