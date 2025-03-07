import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-white shadow-lg py-4">
    <div className="container mx-auto text-center">
      <p className="text-gray-500 mb-4">
        &copy; {new Date().getFullYear()} School Management System. All rights reserved.
      </p>
      <div className="flex justify-center space-x-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          <FaFacebook size={24} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
          <FaTwitter size={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
          <FaInstagram size={24} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;