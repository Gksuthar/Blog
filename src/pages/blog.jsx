import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const Blog = ({ url, token, setShowLogin, darkmode }) => {  // Added darkmode prop
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      setShowLogin(true);
    }
  }, [token, setShowLogin]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    if (id) {
      const getData = async () => {
        try {
          const response = await axios.get(`${url}/api/getBlog/${id}`);
          setData(response.data.data);
          fetchComments(id);
        } catch (error) {
          console.error("Error fetching blog data:", error);
        } finally {
          setIsLoading(false);
        }
      };
      getData();
    }
  }, [location.search, url]);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(
        `${url}/api/getComment?postId=${postId}`
      );
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    const postId = queryParams.get("id");

    if (!postId || !newComment.name || !newComment.comment) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${url}/api/postComment`, {
        postId,
        name: newComment.name,
        comment: newComment.comment,
      });
      if (response) { 
        setComments([...comments, response.data.data]);
        toast('Comment Posted Successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      setNewComment({ name: "", comment: "" });
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${darkmode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : data ? (
        <div className={`max-w-4xl mx-auto p-8 rounded-xl shadow-2xl ${darkmode ? "bg-gray-800" : "bg-white"}`}>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              className="w-full h-96 object-cover transform hover:scale-110 transition-transform duration-500"
              alt="Blog Post"
              src={data.img || "https://via.placeholder.com/600x400"}
            />
          </div>

          <div className="mt-8">
            <h1 className="text-4xl font-bold mb-6">
              {data.title}
            </h1>
            <p className="text-lg leading-relaxed">
              {data.content}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className={`mb-4 p-4 rounded-lg ${darkmode ? "bg-gray-700" : "bg-gray-50"}`}>
                  <p className="font-semibold">{comment.name}</p>
                  <p>{comment.comment}</p>
                  <p className="text-sm">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Leave a Comment</h2>
            <form onSubmit={handleCommentSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={newComment.name}
                  onChange={handleCommentChange}
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="comment"
                  value={newComment.comment}
                  onChange={handleCommentChange}
                  placeholder="Your Comment"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300"
              >
                Submit Comment
              </button>
            </form>
          </div>

          <div className="mt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg">
          No blog data found.
        </div>
      )}
    </div>
  );
};

export default Blog;
