import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark border-t border-gray-800 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="flex items-center justify-center gap-2 text-gray-400">
          Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by M Rafli Setiawan
        </p>
        <p className="text-gray-600 text-sm mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;