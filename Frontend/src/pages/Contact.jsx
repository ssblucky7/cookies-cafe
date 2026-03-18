import { useState } from 'react'
import { FiMapPin, FiPhone, FiMail, FiClock, FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiSend, FiMessageCircle } from 'react-icons/fi'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [formStatus, setFormStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setFormStatus('success')
    setTimeout(() => {
      setFormStatus(null)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const faqs = [
    {
      question: 'What are your opening hours?',
      answer: 'We are open Monday to Friday from 8:00 AM to 10:00 PM, and Saturday to Sunday from 9:00 AM to 11:00 PM.'
    },
    {
      question: 'Do you take reservations?',
      answer: 'We operate on a first-come, first-served basis for regular seating. However, we do accept reservations for groups of 8 or more. Please call us at least 24 hours in advance.'
    },
    {
      question: 'Can I place orders online?',
      answer: 'Yes! You can browse our menu and place orders through our website. We offer both pickup and delivery options.'
    },
    {
      question: 'Do you offer catering services?',
      answer: 'Absolutely! We provide catering for events, parties, and corporate gatherings. Contact us for custom quotes and menu options.'
    },
    {
      question: 'Are there vegan and gluten-free options?',
      answer: 'Yes, we have a variety of vegan and gluten-free cookies available. Check our menu or ask our staff for current options.'
    },
    {
      question: 'Do you have WiFi?',
      answer: 'Yes, we offer free high-speed WiFi for all customers. The password is available at the counter.'
    },
    {
      question: 'Is parking available?',
      answer: 'We have a small parking lot behind the café with 15 spaces. Street parking is also available nearby.'
    },
    {
      question: 'Can I host an event at your café?',
      answer: 'Yes! We have a private event space that can accommodate up to 30 people. Contact us to discuss availability and packages.'
    }
  ]

  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-r from-caramel to-brown overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1920"
            alt="Contact"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl md:text-2xl text-cream">
              We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-caramel rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="text-3xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-darkBrown mb-2">Visit Us</h3>
              <p className="text-brown">123 Cookie Street</p>
              <p className="text-brown">Café City, CC 12345</p>
            </div>

            {/* Phone */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-caramel rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPhone className="text-3xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-darkBrown mb-2">Call Us</h3>
              <p className="text-brown">+1 (234) 567-8900</p>
              <p className="text-brown text-sm">Mon-Fri: 8AM-10PM</p>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-caramel rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-3xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-darkBrown mb-2">Email Us</h3>
              <p className="text-brown">info@cookiescafe.com</p>
              <p className="text-brown text-sm">We reply within 24hrs</p>
            </div>

            {/* Hours */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition">
              <div className="w-16 h-16 bg-caramel rounded-full flex items-center justify-center mx-auto mb-4">
                <FiClock className="text-3xl text-white" />
              </div>
              <h3 className="text-lg font-semibold text-darkBrown mb-2">Opening Hours</h3>
              <p className="text-brown">Mon-Fri: 8AM-10PM</p>
              <p className="text-brown">Sat-Sun: 9AM-11PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-darkBrown mb-4">Send Us a Message</h2>
                <p className="text-brown text-lg">
                  Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-brown font-semibold mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-brown focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-brown font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-brown focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-brown font-semibold mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-brown focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent transition"
                    placeholder="How can we help?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-brown font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border-2 border-brown focus:outline-none focus:ring-2 focus:ring-caramel focus:border-transparent transition resize-none"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-caramel hover:bg-brown text-white px-8 py-4 rounded-lg transition font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <FiSend /> Send Message
                </button>

                {/* Success Message */}
                {formStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent successfully. We'll get back to you soon!
                  </div>
                )}
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-darkBrown mb-4">Find Us Here</h2>
                <p className="text-brown text-lg">
                  Visit our cozy café and experience the warmth of freshly baked cookies!
                </p>
              </div>

              {/* Map */}
              <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg mb-8 h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841!2d-73.9875!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMTUuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Cookies Café Location"
                ></iframe>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-darkBrown mb-4">Connect With Us</h3>
                <p className="text-brown mb-6">Follow us on social media for updates, offers, and sweet moments!</p>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-caramel hover:bg-brown text-white rounded-full flex items-center justify-center transition"
                  >
                    <FiFacebook size={24} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-caramel hover:bg-brown text-white rounded-full flex items-center justify-center transition"
                  >
                    <FiInstagram size={24} />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-caramel hover:bg-brown text-white rounded-full flex items-center justify-center transition"
                  >
                    <FiTwitter size={24} />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-caramel hover:bg-brown text-white rounded-full flex items-center justify-center transition"
                  >
                    <FiYoutube size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-darkBrown mb-4">Frequently Asked Questions</h2>
            <p className="text-brown text-lg">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-cream rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-opacity-80 transition"
                >
                  <span className="font-semibold text-darkBrown text-lg">{faq.question}</span>
                  <span className="text-caramel text-2xl">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-white border-t border-cream">
                    <p className="text-brown">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brown text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FiMessageCircle className="text-6xl mx-auto mb-6 text-caramel" />
          <h2 className="text-4xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-xl text-cream mb-8">
            Don't hesitate to reach out! Our friendly team is here to help you with anything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+12345678900"
              className="bg-caramel hover:bg-cream hover:text-brown text-white px-8 py-4 rounded-lg transition font-semibold text-lg"
            >
              Call Us Now
            </a>
            <a
              href="mailto:info@cookiescafe.com"
              className="bg-white text-brown hover:bg-cream px-8 py-4 rounded-lg transition font-semibold text-lg"
            >
              Send an Email
            </a>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-darkBrown mb-3">Quick Response</h3>
              <p className="text-brown">We typically respond to all inquiries within 24 hours during business days.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-darkBrown mb-3">Multiple Channels</h3>
              <p className="text-brown">Reach us via phone, email, social media, or visit us in person.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-darkBrown mb-3">Friendly Support</h3>
              <p className="text-brown">Our team is always ready to assist you with a smile and helpful attitude.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
