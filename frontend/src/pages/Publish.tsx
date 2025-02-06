import axios from "axios";
import { Appbar } from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

export const Publish = () => {
  const [editorContent, setEditorContent] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleEditorChange = (content: any) => {
    setEditorContent(content);
  };

  const handlePublish = async () => {
    try {
      if (!title.trim() || !editorContent.trim()) {
        alert("Please provide a title and content for your blog!");
        return;
      }

      // **1. Upload Image to the Server**

      const formData = new FormData();
      if (thumbnail) {
        formData.append("image", thumbnail); // Make sure this key matches the backend
      }

      // request to upload file to imgBB server
      if (thumbnail) {
        const imageResponse = await fetch(
          "https://api.imgbb.com/1/upload?key=4edf778307ae73cbfec32d47e9c6ebb9",
          {
            method: "POST",
            body: formData,
          }
        );
      

      const imageData = await imageResponse.json();
      const uploadedImageUrl = imageData.data.url; // ✅ Get the URL directly
      console.log("Uploaded Image URL:", uploadedImageUrl);

      // send the image url and other data to the backend database and server
      const response = await axios.post(
        
        `${BACKEND_URL}/api/v1/blog`,
        {
          title: title,
          content: editorContent,
          thumbnail: uploadedImageUrl,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      navigate(`/blog/${response.data.id}`);
      }
    } catch (error) {
      console.error("Error publishing the post:", error);
      alert("Failed to publish the post. Please try again.");
    }
  };

  return (
    <div>
      <Appbar onAvatarClick={() => {}} />
      <div className="flex justify-center pt-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
          {/* Title Section */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create a New Blog Post
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

          {/* Thumbnail Upload */}
          <label
            htmlFor="thumbnail"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Blog Thumbnail
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
              initialValue=""
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

          {/* Publish Button */}
          <div className="text-center">
            <button
              onClick={handlePublish}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
