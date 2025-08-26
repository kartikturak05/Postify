import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import useBlogStore from "../Store";

import React from "react";

export const Blogs: React.FC = () => {
  const { loading, blogs } = useBlogs();
  

  const { searchQuery } = useBlogStore();

  const filteredBlogs = blogs
  .filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()); // latest first

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
    <div className="container mx-auto md:pt-10 pt-20 px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.length === 0 ? (
              <p className="text-gray-800 text-center text-3xl">
                No blogs found.
              </p>
            ) : (
              filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  authorName={blog.author?.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={blog.publishedDate}
                  ThumbnailLink={blog.ThumbnailLink}
                  id={blog.id}
                />
              ))
            )}
          {/* Remove duplicate "No blogs found" message since it's already handled above */}
            </div>
        </div>
      </div>
    </div>
  </>
  );
}
