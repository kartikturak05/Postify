import { useState } from "react";
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
        <div className="container mx-auto md:pt-10 pt-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar - Hidden on mobile, visible on larger screens */}
        {/* <div className="hidden lg:block lg:col-span-1">
          <UserProfileSidebar isOpen={true} />
        </div> */}
        
        {/* Mobile sidebar - only visible when isSidebarOpen is true */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSidebarOpen(false)}></div>
            <div className="absolute left-0 top-0 h-full w-64 bg-white shadow-lg">
              <UserProfileSidebar isOpen={isSidebarOpen} />
            </div>
          </div>
        )}
        
        {/* Blog content section - full width on mobile, 3/4 width on desktop */}
        <div className="col-span-1 lg:col-span-3">
          {/* Blog cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                authorName={blog.author?.name || "Anonymous"}
                title={blog.title}
                content={blog.content}
                publishedDate={blog.publishedDate}
                ThumbnailLink={blog.ThumbnailLink} // Fixed property name
                id={blog.id}
              />
            ))}
          </div>
          
          {/* Empty state when no blogs */}
          {blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No blogs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
