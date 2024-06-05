import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"
export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div>
        <Appbar></Appbar>

            <div className="flex justify-center">

                <div>
                <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
                </div>

            </div>

            
        </div>
    }

    return <>
        <Appbar></Appbar>
        <div className="flex justify-center">
            {/* {console.log(blogs)} */}
            <div className="">
                {/* {console.log(blogs)} */}
                {blogs.map(blog => <BlogCard 
                authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content} 
                    publishedData="3 june 2024"
                    id={blog.id}>
                </BlogCard>)}
                
            </div>
        </div>
    </>
}
