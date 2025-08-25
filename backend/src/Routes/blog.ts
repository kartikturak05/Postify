import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInputs, updateBlogInputs } from "@kartikturak05/medium-common";



export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
        CLOUDNARY_API_SECRET:string;
        CLOUDNARY_CLOUD_Name:string;
        CLOUDNARY_API_KEY:string;
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
    // extract the user id
    // and passed it down to the route handler
    const Authheader = c.req.header("Authorization") || "";
    console.log(Authheader);
    const token = Authheader;
    console.log("secret "+c.env.JWT_SECRET)
    try {
        const user = await verify(token, c.env.JWT_SECRET) as User;
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




blogRouter.post('/', async (c) => {
    const date = getFormattedDate();
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const userId =  c.get("userId");


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
                ThumbnailLink: body.thumbnail,
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
                content: body.content,
                ThumbnailLink: body.thumbnail,
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



// Todo:add pagination => show only first 10 blog then load more and
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
                ThumbnailLink:true,
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
                ThumbnailLink:true,
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

// fetch user details 
blogRouter.post('/userdetails', async (c) => {
    console.log("hello")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const userId =  c.get("userId");
    console.log(userId)
    console.log("adhfdshfdksjfhhhfkd")

    try {
        const respons = await prisma.user.findUnique({
            where: {
                id: userId
            }, select: {
                name: true,
                email:true
            }
        })
        return c.json({
            respons
        })
    } catch (err) {
        c.status(403);
        return c.json({ error: "Something went wrong !!" })
    }
})

// blogs for only specific user
blogRouter.get('/user/blogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.req.query("userId"); // Extract userId from query parameters

    if (!userId) {
        c.status(400);
        return c.json({ error: "User ID is required" });
    }

    try {
        const userBlogs = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedDate: true,
                ThumbnailLink: true
            }
        });

        return c.json({
            blogs: userBlogs
        });
    } catch (err) {
        c.status(500);
        return c.json({ error: "Something went wrong while fetching blogs" });
    }
});

// delete the blog of from blog id

blogRouter.delete('/:id', async (c) => {
    const blogId = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get("userId"); // Get user ID from middleware

    try {
        // Check if the blog exists and belongs to the user
        const blog = await prisma.post.findUnique({
            where: { id: blogId },
            select: { authorId: true }
        });

        if (!blog) {
            c.status(404);
            return c.json({ error: "Blog not found" });
        }

        if (blog.authorId !== userId) {
            c.status(403);
            return c.json({ error: "You are not authorized to delete this blog" });
        }

        // Delete the blog
        await prisma.post.delete({
            where: { id: blogId }
        });

        return c.json({ message: "Blog deleted successfully" });

    } catch (err) {
        console.error("Error deleting blog:", err);
        c.status(500);
        return c.json({ error: "Something went wrong while deleting the blog" });
    }
});

