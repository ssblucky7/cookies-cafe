import { useState } from 'react'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! Welcome to Cookies Café! How can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const suggestions = [
    { text: 'View Menu', category: 'menu' },
    { text: 'Popular Items', category: 'menu' },
    { text: 'Contact Us', category: 'contact' },
    { text: 'Store Hours', category: 'contact' },
    { text: 'Special Offers', category: 'menu' },
    { text: 'Location', category: 'contact' }
  ]

  const botResponses = {
    menu: [
      'Our menu features delicious handcrafted cookies including Chocolate Chip, Double Chocolate, Oatmeal Raisin, and more! Would you like to see our full menu?',
      'We have amazing cookies starting from $4.49! Check out our special offers for great deals.'
    ],
    popular: [
      'Our most popular items are:\n• Chocolate Chip Cookie - $4.99\n• Double Chocolate Cookie - $5.99\n• Peanut Butter Cookie - $5.49\nWould you like to order?'
    ],
    contact: [
      'You can reach us at:\n📞 Phone: (555) 123-4567\n📧 Email: info@cookiescafe.com\n📍 Address: 123 Sweet Street, Cookie Town\nWe\'d love to hear from you!'
    ],
    hours: [
      'Our store hours are:\n🕐 Monday - Friday: 8:00 AM - 8:00 PM\n🕐 Saturday - Sunday: 9:00 AM - 9:00 PM\nCome visit us!'
    ],
    offers: [
      'Current Special Offers:\n🎉 Buy 2 Get 1 Free on selected items\n🎉 20% off on orders above $20\n🎉 Free coffee with cookie combo\nDon\'t miss out!'
    ],
    location: [
      'We\'re located at 123 Sweet Street, Cookie Town, CT 12345.\nEasy parking available! Visit us today!'
    ],
    default: [
      'I can help you with:\n• Menu information\n• Popular items\n• Contact details\n• Store hours\n• Special offers\n• Location\nWhat would you like to know?'
    ]
  }

  const handleSuggestionClick = (suggestion) => {
    const userMessage = {
      type: 'user',
      text: suggestion.text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, userMessage])

    setTimeout(() => {
      let botResponse = ''
      const lowerText = suggestion.text.toLowerCase()

      if (lowerText.includes('menu')) {
        botResponse = botResponses.menu[0]
      } else if (lowerText.includes('popular')) {
        botResponse = botResponses.popular[0]
      } else if (lowerText.includes('contact')) {
        botResponse = botResponses.contact[0]
      } else if (lowerText.includes('hours')) {
        botResponse = botResponses.hours[0]
      } else if (lowerText.includes('offer')) {
        botResponse = botResponses.offers[0]
      } else if (lowerText.includes('location')) {
        botResponse = botResponses.location[0]
      } else {
        botResponse = botResponses.default[0]
      }

      const botMessage = {
        type: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMessage])
    }, 500)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = {
      type: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, userMessage])
    setInputMessage('')

    setTimeout(() => {
      let botResponse = ''
      const lowerInput = inputMessage.toLowerCase()

      if (lowerInput.includes('menu') || lowerInput.includes('cookie') || lowerInput.includes('item')) {
        botResponse = botResponses.menu[Math.floor(Math.random() * botResponses.menu.length)]
      } else if (lowerInput.includes('popular') || lowerInput.includes('best') || lowerInput.includes('recommend')) {
        botResponse = botResponses.popular[0]
      } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
        botResponse = botResponses.contact[0]
      } else if (lowerInput.includes('hour') || lowerInput.includes('open') || lowerInput.includes('close')) {
        botResponse = botResponses.hours[0]
      } else if (lowerInput.includes('offer') || lowerInput.includes('deal') || lowerInput.includes('discount')) {
        botResponse = botResponses.offers[0]
      } else if (lowerInput.includes('location') || lowerInput.includes('address') || lowerInput.includes('where')) {
        botResponse = botResponses.location[0]
      } else if (lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('hey')) {
        botResponse = 'Hello! How can I assist you today?'
      } else if (lowerInput.includes('thank')) {
        botResponse = 'You\'re welcome! Is there anything else I can help you with?'
      } else {
        botResponse = botResponses.default[0]
      }

      const botMessage = {
        type: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMessage])
    }, 500)
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-caramel hover:bg-brown text-white p-4 rounded-full shadow-lg transition z-50 flex items-center gap-2"
        >
          <FiMessageCircle size={24} />
          <span className="hidden md:inline font-semibold">Chat with us</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="bg-caramel text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Cookies Café Assistant</h3>
              <p className="text-sm text-cream">Online now</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-brown p-2 rounded-full transition"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-caramel text-white'
                      : 'bg-white text-darkBrown border border-brown'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-cream' : 'text-brown'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="p-3 border-t border-cream bg-white">
            <p className="text-xs text-brown mb-2 font-semibold">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-cream hover:bg-caramel hover:text-white text-brown px-3 py-1 rounded-full transition"
                >
                  {suggestion.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-cream bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
              />
              <button
                type="submit"
                className="bg-caramel hover:bg-brown text-white p-2 rounded-lg transition"
              >
                <FiSend size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot
