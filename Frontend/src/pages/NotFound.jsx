import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-caramel mb-4">404</h1>
        <h2 className="text-4xl font-bold text-darkBrown mb-4">Page Not Found</h2>
        <p className="text-brown text-lg mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center gap-2">
            <FiHome /> Go Home
          </Link>
          <Link to="/menu" className="bg-white border-2 border-brown text-brown px-6 py-3 rounded-lg hover:bg-brown hover:text-white transition font-semibold flex items-center gap-2">
            <FiSearch /> Browse Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
