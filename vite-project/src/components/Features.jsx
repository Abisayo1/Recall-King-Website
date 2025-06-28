import React from "react";
import {
  Bell,
  Handshake,
  MessageCircle,
  ScanLine,
  Search,
} from "lucide-react";

const values = [
  {
    title: "Real-time alerts",
    description: "Stay instantly informed with real-time alerts on critical updates, enabling swift action and enhanced security awareness.",
    icon: <Bell className="text-blue-600 w-8 h-8" />,
  },
  {
    title: "Personalized notifications",
    description: "Receive updates tailored to your preferences and activities, keeping you informed on what matters most.",
    icon: <MessageCircle className="text-blue-600 w-8 h-8" />,
  },
  {
    title: "Barcode scanning",
    description: "Quickly scan barcodes to access product details, verify authenticity, or retrieve data in real time.",
    icon: <ScanLine className="text-blue-600 w-8 h-8" />,
  },
  {
    title: "Searchable recall database",
    description: "Easily search and access up-to-date recall information for products, vehicles, and more.",
    icon: <Search className="text-blue-600 w-8 h-8" />,
  },
  {
    title: "Safety tips",
    description: "Get practical advice to stay safe, secure, and informed in everyday situations.",
    icon: <Handshake className="text-blue-600 w-8 h-8" />,
  },
];

export default function Features() {
  return (
    <section id="features">
    <div className="max-w-7xl mx-auto py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900">
        Features
      </h2>
      <p className="mt-4 text-gray-600 max-w-xl mx-auto">
        Creating Extraordinary Customer Experience
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-purple-100 rounded-full">
              {item.icon}
            </div>
            <h3 className="font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
}
