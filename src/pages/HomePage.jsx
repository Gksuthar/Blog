import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const HomePage = ({ url, darkmode }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${url}/api/getBlogs`);
        if (response.status === 200) {
          setData(response.data.data);
        } else {
          setError("Error fetching data");
        }
      } catch (error) {
        setError("Error: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [url]);

  const handleReadMore = (id) => {
    navigate(`/blog?id=${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (data.length === 0) {
    return <div className="text-center text-gray-600">No data found.</div>;
  }

  return (
    <div className={darkmode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
      <section className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 justify-center justify-items-end gap-4 px-4">
          {data.map((item, index) => (
            <div
              key={index + 1}
              className="lg:w-1/4 md:w-1/2 p-4 w-full border border-gray-200 shadow-2xl flex flex-col animate-fadeIn transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt={item.title}
                  className="object-cover object-center w-full h-full block"
                  src={item.img}
                />
              </a>
              <div className="mt-4">
                <h3 className=" text-xs tracking-widest title-font mb-1">
                  {item.title}
                </h3>
                <h2 className=" title-font text-lg font-medium">
                  {item.content.substring(0, 100)}...
                </h2>
                <button
                  onClick={() => handleReadMore(item._id)}
                  className="bg-indigo-500 text-white hover:cursor-pointer hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 px-6 p-2 rounded-md text-base font-semibold mt-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

HomePage.propTypes = {
  url: PropTypes.string.isRequired,
  darkmode: PropTypes.bool.isRequired,
};

export default HomePage;