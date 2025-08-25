import { useEffect, useState } from "react";
import { useMyDetails } from "../hooks";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface Blog {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  ThumbnailLink: string;
}

const UserProfile = () => {
  const { user: MyUser } = useMyDetails() || {
    user: { id: "", name: "Guest" },
  };
  const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      if (!MyUser?.id) return;
      console.log("Fetching user blogs...");

      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/user/blogs?userId=${MyUser.id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.data;
        console.log(data);

        if (response.status === 200) {
          setUserBlogs(data.blogs || []);
        } else {
          console.error("Error fetching user blogs:", data.error);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [MyUser?.id]);

  const handleDelete = async (blogId: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/blog/${blogId}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        toast.success("Blog deleted successfully!");
        setUserBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
      } else {
        console.error("Error deleting blog:", response.data.error);
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        <p className="text-gray-600">Hello, {MyUser?.name || "Guest"}</p>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Blogs</h3>
        {loading ? (
          <p className="text-gray-500 text-xl">Loading.....</p>
        ) : userBlogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-10">
            {userBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-105 max-h-96 h-full flex flex-col"
              >
                <Link to={`/blog/${blog.id}`} className="flex-grow">
                  <img
                    src={blog.ThumbnailLink}
                    alt={blog.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex-grow">
                    <h4 className="text-lg font-bold text-gray-900">
                      {blog.title}
                    </h4>
                    <div
                      className="text-gray-700 text-sm mt-2"
                      dangerouslySetInnerHTML={{
                        __html: blog.content.split(" ").slice(0, 10).join(" "),
                      }}
                    ></div>
                  </div>
                </Link>
                <div className="p-4 flex justify-between gap-2">
                  <Link
                    to={`/update-blog/${blog.id}`}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 text-sm transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm transition-colors"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl mb-4">No blogs found</p>
            <Link
              to="/publish"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Your First Blog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;