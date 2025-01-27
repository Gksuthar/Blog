import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Blog = ({url, token, setShowLogin }) => {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      setShowLogin(true);
    }
  }, [token, setShowLogin]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    if (id) {
      const getData = async () => {
        try {
          const response = await axios.get(`${url}/api/getBlog/${id}`);
          setData(response.data.data);
        } catch (error) {
          console.error('Error fetching blog data:', error);
        }
      };
      getData();
    }
  }, [location.search]);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      {data ? (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                className="w-full h-64 object-cover rounded-lg"
                alt="Blog Post"
                src={data.img || "https://via.placeholder.com/600x400"}
              />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">{data.title}</h1>
              <p className="text-gray-600 text-lg">{data.content}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 text-lg">Loading...</div>
      )}
    </div>
  );
};

export default Blog;
