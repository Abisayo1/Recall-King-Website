import React from "react";
import { Link } from "react-router-dom";
import blogs from "../src/blogs";
import Footer from "../src/components/Footer";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <div className="flex-1 max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">Our Blog</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {blog.headerImage && (
                <img
                  src={blog.headerImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-blue-700">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mt-2">Read more →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
