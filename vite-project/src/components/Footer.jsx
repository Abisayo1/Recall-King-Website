import React from "react";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#E5FDE4] py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
        {/* Logo Section */}
        <div>
          <img src="/logo.png" alt="Company Logo" className="w-32 top-0" />
      
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            Saving lives and money through recall awareness.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#howitworks" className="hover:text-blue-600">How it Works</a></li>
            <li><a href="#features" className="hover:text-blue-600">Features</a></li>
            <li><a href="#faq" className="hover:text-blue-600">FAQ</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-600">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-600">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/107562109/admin/dashboard/" className="hover:text-blue-600">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-blue-600">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[#E5FDE4] mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Recall King™ | Patent Pending | Trademark Pending
      </div>
    </footer>
  );
}
