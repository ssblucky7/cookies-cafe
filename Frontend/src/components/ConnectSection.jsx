import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMail, FiPhone } from 'react-icons/fi'

const ConnectSection = () => {
  return (
    <section className="py-16 bg-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Connect With Us</h2>
          <p className="text-cream">Stay updated with our latest offerings and news</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="bg-cream text-brown p-4 rounded-full hover:bg-caramel hover:text-white transition">
                <FiFacebook size={24} />
              </a>
              <a href="#" className="bg-cream text-brown p-4 rounded-full hover:bg-caramel hover:text-white transition">
                <FiInstagram size={24} />
              </a>
              <a href="#" className="bg-cream text-brown p-4 rounded-full hover:bg-caramel hover:text-white transition">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="bg-cream text-brown p-4 rounded-full hover:bg-caramel hover:text-white transition">
                <FiYoutube size={24} />
              </a>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <FiPhone size={20} />
                <span>+1 234 567 8900</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <FiMail size={20} />
                <span>info@cookiescafe.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConnectSection
