import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import blogs from "./blogs";
import Footer from "./components/Footer";

export default function BlogDetails() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Recall King Blog`;
    } else {
      document.title = "Blog Not Found | Recall King";
    }
  }, [blog]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">404 – Blog Not Found</h1>
          <p className="text-gray-600 mb-6">
            The blog you’re looking for doesn’t exist or has been removed.
          </p>
          <Link to="/blog" className="text-blue-600 underline">
            ← Back to Blog List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <div className="flex-1 p-4 md:p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md mt-10">
        {blog.headerImage && (
          <img
            src={blog.headerImage}
            alt="Blog Header"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-3xl font-bold mb-4 text-blue-700">{blog.title}</h1>

        <div
          className="text-gray-700 prose prose-blue mb-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        {blog.inlineImages?.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Visual ${i + 1}`}
            className="w-full rounded-lg mb-6 shadow-sm"
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
