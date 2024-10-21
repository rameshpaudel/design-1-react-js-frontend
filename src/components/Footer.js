import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 h-[8vh]">
      <div className="container mx-auto px-4 flex justify-between items-center h-full">
        <span className="text-gray-400">© 2024 MalwarePro. All rights reserved.</span>
        <div className="space-x-4">
          <Link to="/privacy-policy">
            <span className="text-gray-300 hover:text-white transition-colors">Privacy Policy</span>
          </Link>
          <Link to="/terms-of-service">
            <span className="text-gray-300 hover:text-white transition-colors">Terms of Service</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
