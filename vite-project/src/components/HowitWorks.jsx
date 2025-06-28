import React from "react";

const steps = [
  {
    id: 1,
    title: "Download the app",
    description: "Download the app and create your account to get started.",
    image: "/download.png", // Place your own image file
  },
  {
    id: 2,
    title: "Scan the Barcode of your product",
    description: "Fill in the neccessary details to get alerts.",
    image: "/scan.png", // Place your own image file
  },
  {
    id: 3,
    title: "Get notified when a recall happens.",
    description: "Get real-time recall alerts based on your purchases or subscriptions. Take Action",
    image: "/notify.png", // Place your own image file
  },
];

export default function HowitWorks() {
  return (
    <section id="howitworks" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">How it Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center text-center space-y-4"
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-28 h-28 object-contain"
              />
              <div className="flex items-center space-x-2">
                <span className="text-white bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full text-sm">
                  {step.id}
                </span>
                <h3 className="text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>
              </div>
              {/* Optional description */}
              {/* <p className="text-sm text-gray-600">{step.description}</p> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
