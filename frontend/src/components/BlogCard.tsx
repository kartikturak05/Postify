import { Link } from "react-router-dom";

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
  return (
    <Link to={`/blog/${id}`}>
      <div className="pt-4 border-b border-slate-200 pb-4 md:w-screen sm:max-w-screen-md cursor-pointer hover:shadow-lg hover:shadow-fgray-800 hover:scale-105 transform transition duration-200 ease-in-out">
        <div className="h-48 w-full bg-gray-100 rounded-lg flex items-center justify-between pl-5 pr-5 pt-3 pb-1">
          {/* Left Content */}
          <div className="flex-grow min-w-0">
            <div className="flex items-center">
              <Avatar name={authorName} />
              <div className="font-normal pl-2 text-sm">{authorName}</div>
              <div className="pl-2 text-slate-400 text-sm">{publishedDate}</div>
            </div>
            <div className="text-xl font-semibold py-2 truncate">{title}</div>
            <div
              className="text-md font-thin md:w-[30px] w-[10px] truncate mr-2"
              dangerouslySetInnerHTML={{
                __html: content.slice(0, 100) + "...",
              }}
            />
            <div className="text-slate-500 text-sm font-thin pt-4">
              {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
          </div>
          {/* Right Thumbnail */}
          <div className="md:w-48 md:h-40 sm:w-2 sm:h-2 flex-shrink-0">
            <img
              src={ThumbnailLink}
              alt="blog"
              className="w-28 h-28 md:w-full md:h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};



export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center text-center justify-center w-8 h-8 mt-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-xs text-gray-600 dark:text-gray-300 font-semibold">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
