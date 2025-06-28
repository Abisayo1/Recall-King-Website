import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../src/components/Footer"; // ✅ Make sure the path to Footer is correct

// Example blog data with optional images
const blogs = [
  {
    id: 1,
    title: "Why we Created Recall King – The Story Behind the App",
    headerImage: "/notalert.png", // Main header image for the blog
    content: `
It all started with a headline we couldn’t ignore.

A family had unknowingly fed their child food that had been recalled weeks earlier due to contamination. The child ended up in the hospital. Not because the parents were careless — but because they simply didn’t know.

That shook us.

As people who care deeply about technology and its power to solve real problems, We asked a hard question:

“How is it that in an age of smartphones and real-time alerts, people are still the last to know when something they’ve bought could hurt them?”

We started digging. What we found was alarming:

• Millions of people remain unaware of recalls affecting products in their homes.
• The information does exist — but it’s scattered across government sites, press releases, or buried in fine print.
• There was no centralized, user-friendly, trustworthy app built for everyday people to stay informed and safe.

So we created Recall King — an app built not just to notify, but to protect.
It empowers families, parents, and consumers to know what’s been recalled, why it matters, and what to do about it — all in real time.

But this isn’t just about alerts.

It’s about safety, awareness, and accountability. It’s about making sure a product recall never becomes a personal tragedy.

This is bigger than tech — it’s about trust. It’s about keeping people safe, saving money, and making sure no one is left in the dark again.

We built Recall King for every household. For every parent. For every shopper. For everyone.
    `,
    inlineImages: [
      "/recallHero.png", // Example inline images inside content area
    ],
  },
];

export default function BlogPage() {
  const [selectedBlog, setSelectedBlog] = useState(blogs[0]);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md p-4 hidden md:block">
          <h2 className="text-xl font-bold mb-4">Blog Posts</h2>
          {blogs.map((blog) => (
            <button
              key={blog.id}
              onClick={() => setSelectedBlog(blog)}
              className={`block w-full text-left mb-2 px-3 py-2 rounded ${
                selectedBlog.id === blog.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-50"
              }`}
            >
              {blog.title}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6"
          >
            {/* Blog Header Image */}
            {selectedBlog.headerImage && (
              <motion.img
                src={selectedBlog.headerImage}
                alt="Blog Header"
                className="w-full h-64 object-cover rounded-lg mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {/* Title */}
            <h1 className="text-2xl font-bold mb-4 text-blue-700">{selectedBlog.title}</h1>

            {/* Blog Text Content */}
            <p className="text-gray-700 whitespace-pre-line mb-6">{selectedBlog.content}</p>

            {/* Inline Images */}
            {selectedBlog.inlineImages &&
              selectedBlog.inlineImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Blog Visual ${index + 1}`}
                  className="w-full rounded-lg mb-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                />
              ))}
          </motion.div>
        </div>
      </div>

      {/* ✅ Footer added here */}
      <Footer />
    </div>
  );
}
