import { useState } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import UserProfileSidebar from "../components/UserProfileSidebar";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <div>
        <Appbar onAvatarClick={toggleSidebar} />
        <div className="flex justify-center">
          <div>
            {Array.from({ length: 10 }).map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Appbar onAvatarClick={toggleSidebar} />
      <div className="grid md:grid-cols-3 grid-rows-1">
        {/* Sidebar */}
        <div>

        </div>
        <UserProfileSidebar isOpen={isSidebarOpen} />

        {/* Blogs */}
        <div className="flex-grow p-4">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={blog.publishedDate}
              id={blog.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
