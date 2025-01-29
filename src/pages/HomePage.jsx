import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const HomePage = ({ url }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook for redirection

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${url}/api/getBlogs`);
        if (response.status === 200) {
          console.log(response.data.data);
          setData(response.data.data);
        } else {
          console.error("Error fetching data:", response);
        }
      } catch (error) {
        console.error("Error: " + error);
      }
    };
    // if (/url) {
    getData();
    // }
  }, []);

  const handleReadMore = (id) => {
    navigate(`/blog?id=${id}`); // Use navigate instead of history.push
  };

  return (
    <div className="">
      {data.length > 0 ? (
        <section className=" text-gray-600  ">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center justify-items-end gap-4  px-4 ">
              {data.map((item, index) => (
                <div
                  key={index + 1}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full  border border-gray-200 shadow-2xl flex flex-col animate-fadeIn transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  <a className="block relative h-48 rounded overflow-hidden">
                    <img
                      alt="ecommerce"
                      className="object-cover object-center w-full h-full block"
                      src={item.img}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {item.title}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.content.substring(0, 100)}...
                    </h2>
                    <button
                      onClick={() => handleReadMore(item._id)} // Pass the blog post id to the handler
                      className="bg-indigo-500 text-white hover:cursor-pointer hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 px-6 p-2 rounded-md text-base font-semibold mt-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg "
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        "Page is Loading..."
      )}
    </div>
  );
};

export default HomePage;
