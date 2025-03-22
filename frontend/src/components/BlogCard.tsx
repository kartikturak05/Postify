import { Link } from "react-router-dom";
import UserProfileSidebar from "./UserProfileSidebar";
import { useState } from "react";
import { IoStar } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  ThumbnailLink: string;
  id: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  ThumbnailLink,
  id,
}: BlogCardProps) => {
  const [isStart, setIsStart] = useState(false);
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transform transition duration-200 ease-in-out hover:scale-102 overflow-hidden">
      <Link to={`/blog/${id}`}>
        <div className="">
          {/* Thumbnail - Full width at the top */}
          <div className="w-full h-48">
            <img
              src={ThumbnailLink}
              alt="blog thumbnail"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Container */}
          <div className="p-4">
            {/* Author info and date */}
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                {/* Avatar component or just use an image */}
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    authorName
                  )}&background=random`}
                  alt={authorName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-2 text-sm font-medium">{authorName}</div>
              <div className="ml-2 text-xs text-gray-500">{publishedDate}</div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>

            {/* Content preview */}
            <div className="text-gray-600 mb-3 line-clamp-3">
              {content.slice(0, 150)}...
            </div>

            {/* Reading time */}
            <div className="text-xs text-gray-500">
              {`${Math.ceil(content.length / 1000)} minute${
                Math.ceil(content.length / 1000) !== 1 ? "s" : ""
              } read`}
            </div>
          </div>
        </div>
      </Link>
      <div
        className="p-2 rounded-full text-right flex justify-end cursor-pointer"
        onClick={() => setIsStart(!isStart)}
      >
        {isStart ? (
          <IoStar className="w-7 h-7 text-yellow-400" />
        ) : (
          <IoMdStarOutline className="w-7 h-7 text-gray-800" />
        )}
      </div>
    </div>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div
      className="relative inline-flex items-center text-center justify-center w-8 h-8 mt-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
      onClick={() => <UserProfileSidebar isOpen={true} />}
    >
      <span className="font-xs text-gray-600 dark:text-gray-300 font-semibold">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
