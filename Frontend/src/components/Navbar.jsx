import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-cream shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-bold text-brown">
            Cookies Café
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`transition font-medium ${isActive('/') ? 'text-caramel border-b-2 border-caramel' : 'text-darkBrown hover:text-caramel'}`}>Home</Link>
            <Link to="/menu" className={`transition font-medium ${isActive('/menu') ? 'text-caramel border-b-2 border-caramel' : 'text-darkBrown hover:text-caramel'}`}>Menu</Link>
            <Link to="/gallery" className={`transition font-medium ${isActive('/gallery') ? 'text-caramel border-b-2 border-caramel' : 'text-darkBrown hover:text-caramel'}`}>Our Story</Link>
            <Link to="/community" className={`transition font-medium ${isActive('/community') ? 'text-caramel border-b-2 border-caramel' : 'text-darkBrown hover:text-caramel'}`}>Community</Link>
            <Link to="/about" className={`transition font-medium ${isActive('/about') ? 'text-caramel border-b-2 border-caramel' : 'text-darkBrown hover:text-caramel'}`}>About Us</Link>
            <Link to="/contact" className={`transition font-medium ${isActive('/contact') ? 'text-caramel border-b-2 border-caramel' : 'text-darkBrown hover:text-caramel'}`}>Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setShowSearch(!showSearch)} className="text-darkBrown hover:text-caramel">
              <FiSearch size={20} />
            </button>
            <Link to="/login" className="text-darkBrown hover:text-caramel">
              <FiUser size={20} />
            </Link>
            <Link to="/cart" className="text-darkBrown hover:text-caramel relative">
              <FiShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-caramel text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-darkBrown">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {showSearch && (
          <div className="pb-4">
            <input type="text" placeholder="Search..." className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel" />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="md:hidden bg-cream border-t border-brown">
          <div className="px-4 py-4 space-y-3">
            <Link to="/" className={`block transition font-medium ${isActive('/') ? 'text-caramel' : 'text-darkBrown hover:text-caramel'}`}>Home</Link>
            <Link to="/menu" className={`block transition font-medium ${isActive('/menu') ? 'text-caramel' : 'text-darkBrown hover:text-caramel'}`}>Menu</Link>
            <Link to="/gallery" className={`block transition font-medium ${isActive('/gallery') ? 'text-caramel' : 'text-darkBrown hover:text-caramel'}`}>Our Story</Link>
            <Link to="/community" className={`block transition font-medium ${isActive('/community') ? 'text-caramel' : 'text-darkBrown hover:text-caramel'}`}>Community</Link>
            <Link to="/about" className={`block transition font-medium ${isActive('/about') ? 'text-caramel' : 'text-darkBrown hover:text-caramel'}`}>About Us</Link>
            <Link to="/contact" className={`block transition font-medium ${isActive('/contact') ? 'text-caramel' : 'text-darkBrown hover:text-caramel'}`}>Contact</Link>
            <Link to="/login" className={`block transition font-medium ${isActive('/login') ? 'text-caramel' : 'text-darkBrown hover:text-caramel'}`}>Login / Signup</Link>
            <Link to="/cart" className={`block transition font-medium ${isActive('/cart') ? 'text-caramel' : 'text-darkBrown hover:text-caramel'}`}>Cart</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
