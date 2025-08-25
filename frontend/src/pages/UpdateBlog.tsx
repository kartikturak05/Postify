import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";

interface Blog {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  ThumbnailLink: string;
}

export const UpdateBlog = () => {
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        if (!id) return;

        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });

        if (response.status === 200) {
          const blog: Blog = response.data.response; // <- notice .response
          console.log(blog.title, "blog.title");
          console.log(blog.content, "blog.content");
          console.log(blog.ThumbnailLink, "blog.ThumbnailLink");
          setTitle(blog.title);
          setEditorContent(blog.content);
          setCurrentThumbnailUrl(blog.ThumbnailLink);
          console.log(title, "title");
          console.log(editorContent, "editorContent");
          console.log(currentThumbnailUrl, "currentThumbnailUrl");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
        toast.error("Failed to load blog details");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id, navigate]);

  const handleEditorChange = (content: any) => {
    setEditorContent(content);
  };

  const handleUpdate = async () => {
    try {
      if (!title.trim() || !editorContent.trim()) {
        toast.error("Please provide a title and content for your blog!");
        return;
      }

      let thumbnailUrl = currentThumbnailUrl;

      // Upload new thumbnail if provided
      if (thumbnail) {
        const formData = new FormData();
        formData.append("image", thumbnail);

        const imageResponse = await fetch(
          "https://api.imgbb.com/1/upload?key=4edf778307ae73cbfec32d47e9c6ebb9",
          {
            method: "POST",
            body: formData,
          }
        );

        const imageData = await imageResponse.json();
        thumbnailUrl = imageData.data.url;
        console.log("Updated Image URL:", thumbnailUrl);
      }

      // Update the blog
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id: id,
          title: title,
          content: editorContent,
          thumbnail: thumbnailUrl,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        toast.success("Blog updated successfully!");
        navigate(`/blog/${id}`);
      }
    } catch (error) {
      console.error("Error updating the post:", error);
      toast.error("Failed to update the post. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-xl text-gray-600">Loading blog details...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center pt-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
          {/* Title Section */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Update Blog Post
          </h1>

          <label
            htmlFor="title"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter your blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Current Thumbnail Preview */}
          {currentThumbnailUrl && (
            <div className="mb-4">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Current Thumbnail
              </label>
              <img
                src={currentThumbnailUrl}
                alt="Current thumbnail"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

          {/* Thumbnail Upload */}
          <label
            htmlFor="thumbnail"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Update Thumbnail (Optional)
          </label>
          <div className="flex items-center gap-4 mb-6">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setThumbnail(e.target.files[0]);
                }
              }}
              className="block w-full border border-gray-300 rounded-lg p-3 text-gray-500"
            />
          </div>

          {/* Rich Text Editor */}
          <label
            htmlFor="content"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Blog Content
          </label>
          <div className="mb-6">
            <Editor
              apiKey="nx5yz9801516ctk8lmn7rq43lvutt49g8bmxpo3c6lpad5p4"
              initialValue={editorContent}
              init={{
                height: 400,
                menubar: false,
                plugins: ["link", "lists", "autolink", "preview", "wordcount"],
                toolbar:
                  "undo redo | bold italic underline | bullist numlist | link | preview",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
