import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-darkBrown text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Cookies Café</h3>
            <p className="text-sm mb-4">Handcrafted cookies and premium coffee for every moment.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-caramel transition"><FiFacebook size={20} /></a>
              <a href="#" className="hover:text-caramel transition"><FiInstagram size={20} /></a>
              <a href="#" className="hover:text-caramel transition"><FiTwitter size={20} /></a>
              <a href="#" className="hover:text-caramel transition"><FiYoutube size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-caramel transition">Home</Link></li>
              <li><Link to="/menu" className="hover:text-caramel transition">Menu</Link></li>
              <li><Link to="/gallery" className="hover:text-caramel transition">Our Story</Link></li>
              <li><Link to="/about" className="hover:text-caramel transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Get Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-caramel transition">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-caramel transition">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-caramel transition">Terms of Usage</Link></li>
              <li><Link to="/privacy" className="hover:text-caramel transition">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Details</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiMapPin size={16} />
                <span>123 Cookie Street, Café City</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={16} />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail size={16} />
                <span>info@cookiescafe.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm font-semibold">Service Hours</p>
              <p className="text-sm">Mon-Fri: 8AM - 10PM</p>
              <p className="text-sm">Sat-Sun: 9AM - 11PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-brown mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Cookies Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
