import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id:string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    return <>
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    <div className="">

                        <Avatar name={authorName}></Avatar>
                    </div>
                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col mt-1">
                        {authorName}
                    </div>
                    <div className="flex justify-center flex-col pl-2 mt-1">
                        <Cirlce></Cirlce>
                    </div>
                    <div className="pl-2 font-thin text-slate-400 text-sm flex justify-center flex-col mt-1">
                        {publishedDate}
                    </div>
                </div>
                <div className="text-xl font-semibold py-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    {`${Math.ceil(content.length / 100)} minute(s) read`}
                </div>
            </div>
        </Link>
    </>
}
function Cirlce() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">
    </div>
}

export function Avatar({ name }: { name: string }) {
    return <div className="relative inline-flex items-center text-center justify-center w-8 h-8 mt-3 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-xs font-thin text-gray-600 dark:text-gray-300 ">{name[0]}</span>
    </div>
}