import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart, FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  return (
    <nav className="bg-cream shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-bold text-brown">
            Cookies Café
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-darkBrown hover:text-caramel transition">Home</Link>
            <Link to="/menu" className="text-darkBrown hover:text-caramel transition">Menu</Link>
            <Link to="/gallery" className="text-darkBrown hover:text-caramel transition">Our Story</Link>
            <Link to="/community" className="text-darkBrown hover:text-caramel transition">Community</Link>
            <Link to="/about" className="text-darkBrown hover:text-caramel transition">About Us</Link>
            <Link to="/contact" className="text-darkBrown hover:text-caramel transition">Contact</Link>
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
            <Link to="/" className="block text-darkBrown hover:text-caramel">Home</Link>
            <Link to="/menu" className="block text-darkBrown hover:text-caramel">Menu</Link>
            <Link to="/gallery" className="block text-darkBrown hover:text-caramel">Our Story</Link>
            <Link to="/community" className="block text-darkBrown hover:text-caramel">Community</Link>
            <Link to="/about" className="block text-darkBrown hover:text-caramel">About Us</Link>
            <Link to="/contact" className="block text-darkBrown hover:text-caramel">Contact</Link>
            <Link to="/login" className="block text-darkBrown hover:text-caramel">Login / Signup</Link>
            <Link to="/cart" className="block text-darkBrown hover:text-caramel">Cart</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
