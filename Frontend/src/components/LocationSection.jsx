import { useState } from 'react'
import { FiMapPin, FiMail, FiPhone, FiUser } from 'react-icons/fi'

const LocationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-darkBrown mb-4">Visit Us</h2>
          <p className="text-brown">Find us or send us a message</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-lg overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841!2d-73.9875!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMTUuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Location Map"
            ></iframe>
          </div>

          <div className="bg-cream p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-darkBrown mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-brown mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                  required
                />
              </div>
              <div>
                <label className="block text-brown mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                  required
                />
              </div>
              <div>
                <label className="block text-brown mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                />
              </div>
              <div>
                <label className="block text-brown mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LocationSection
