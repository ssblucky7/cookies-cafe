import { Link } from 'react-router-dom'
import { FiHeart, FiAward, FiUsers, FiTrendingUp, FiCheck, FiStar, FiCoffee, FiSmile } from 'react-icons/fi'

const AboutUs = () => {
  const values = [
    {
      icon: <FiAward className="text-4xl text-caramel" />,
      title: 'Quality Ingredients',
      description: 'We source only the finest, premium ingredients to ensure every cookie is exceptional.'
    },
    {
      icon: <FiHeart className="text-4xl text-caramel" />,
      title: 'Made with Love',
      description: 'Every cookie is handcrafted with care, passion, and attention to detail.'
    },
    {
      icon: <FiCoffee className="text-4xl text-caramel" />,
      title: 'Freshness Guaranteed',
      description: 'Baked fresh daily to deliver the perfect taste and texture every time.'
    },
    {
      icon: <FiSmile className="text-4xl text-caramel" />,
      title: 'Customer Satisfaction',
      description: 'Your happiness is our priority. We go above and beyond to exceed expectations.'
    }
  ]

  const whyChooseUs = [
    {
      title: 'Homemade Recipes',
      description: 'Traditional family recipes passed down through generations, perfected over time.',
      icon: <FiCheck />
    },
    {
      title: 'Premium Ingredients',
      description: 'We use only the best organic butter, Belgian chocolate, and fresh local ingredients.',
      icon: <FiCheck />
    },
    {
      title: 'Cozy Experience',
      description: 'A warm, welcoming atmosphere where you can relax, work, or catch up with friends.',
      icon: <FiCheck />
    },
    {
      title: 'Community Focused',
      description: 'We\'re more than a café - we\'re a gathering place for our community.',
      icon: <FiCheck />
    },
    {
      title: 'Innovative Flavors',
      description: 'While honoring tradition, we love experimenting with unique and exciting flavors.',
      icon: <FiCheck />
    },
    {
      title: 'Sustainable Practices',
      description: 'Committed to eco-friendly packaging and supporting local suppliers.',
      icon: <FiCheck />
    }
  ]

  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & Head Baker',
      image: 'https://i.pravatar.cc/300?img=1',
      bio: 'With 15 years of baking experience, Sarah turned her passion into Cookies Café. Her grandmother\'s recipes are the heart of our menu.'
    },
    {
      name: 'Michael Chen',
      role: 'Pastry Chef',
      image: 'https://i.pravatar.cc/300?img=2',
      bio: 'Trained in Paris, Michael brings international expertise and creativity to our kitchen, crafting innovative cookie flavors.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Manager',
      image: 'https://i.pravatar.cc/300?img=3',
      bio: 'Emily ensures every customer has an exceptional experience. Her warm smile and attention to detail make everyone feel at home.'
    },
    {
      name: 'David Thompson',
      role: 'Head Barista',
      image: 'https://i.pravatar.cc/300?img=4',
      bio: 'A coffee enthusiast with 10 years of experience, David creates the perfect beverage pairings for our cookies.'
    }
  ]

  const milestones = [
    { year: '2014', event: 'Cookies Café Founded', description: 'Started in a small kitchen with big dreams' },
    { year: '2016', event: 'First Location Opens', description: 'Opened our first café to the community' },
    { year: '2018', event: 'Award Winning', description: 'Named "Best Local Bakery" by City Magazine' },
    { year: '2020', event: 'Community Impact', description: 'Donated 10,000 cookies to local charities' },
    { year: '2022', event: 'Expansion', description: 'Opened second location due to popular demand' },
    { year: '2024', event: 'Going Strong', description: 'Serving 10,000+ happy customers monthly' }
  ]

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-96 bg-darkBrown overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920"
          alt="About Us"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl md:text-2xl text-cream">
              Baking happiness, one cookie at a time
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-darkBrown mb-6">Welcome to Cookies Café</h2>
          <p className="text-lg text-brown leading-relaxed mb-6">
            At Cookies Café, we believe that cookies are more than just a treat—they're a way to 
            bring joy, comfort, and connection to everyday life. Since 2014, we've been dedicated 
            to crafting the finest handmade cookies using traditional recipes and premium ingredients.
          </p>
          <p className="text-lg text-brown leading-relaxed">
            Whether you're looking for a quick pick-me-up, a cozy spot to work, or a place to 
            celebrate life's sweet moments, we're here to make your day a little brighter.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-darkBrown mb-6">Our Story</h2>
              <div className="space-y-4 text-brown text-lg leading-relaxed">
                <p>
                  Cookies Café was born from a simple love for baking and a desire to share that 
                  joy with others. Our founder, Sarah Mitchell, grew up in her grandmother's kitchen, 
                  learning the art of cookie-making from scratch.
                </p>
                <p>
                  What started as weekend baking sessions for friends and family soon turned into 
                  a passion project. In 2014, Sarah took a leap of faith and opened the first 
                  Cookies Café in a small storefront downtown.
                </p>
                <p>
                  The response was overwhelming. People didn't just come for the cookies—they came 
                  for the warmth, the community, and the feeling of home. Today, we're proud to 
                  serve thousands of customers who have become part of our extended family.
                </p>
                <p>
                  Every cookie we bake carries forward the tradition of quality, care, and love 
                  that started in that small kitchen years ago.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400"
                alt="Baking"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400"
                alt="Kitchen"
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400"
                alt="Cookies"
                className="rounded-lg shadow-lg w-full h-64 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1548365328-8c6db3220e4c?w=400"
                alt="Café"
                className="rounded-lg shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-cream p-8 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FiHeart className="text-4xl text-caramel" />
                <h3 className="text-3xl font-bold text-darkBrown">Our Mission</h3>
              </div>
              <p className="text-brown text-lg leading-relaxed mb-4">
                To deliver exceptional quality cookies and beverages that bring joy and comfort 
                to our customers' lives, while creating a warm, welcoming space where community 
                connections flourish.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FiCheck className="text-caramel mt-1 flex-shrink-0" />
                  <span className="text-brown">Provide the highest quality products using premium ingredients</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="text-caramel mt-1 flex-shrink-0" />
                  <span className="text-brown">Create memorable experiences for every customer</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheck className="text-caramel mt-1 flex-shrink-0" />
                  <span className="text-brown">Foster a sense of community and belonging</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-cream p-8 rounded-lg shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <FiTrendingUp className="text-4xl text-caramel" />
                <h3 className="text-3xl font-bold text-darkBrown">Our Vision</h3>
              </div>
              <p className="text-brown text-lg leading-relaxed mb-4">
                To become the most beloved cookie café in the region, known for our commitment 
                to quality, innovation, and community impact, while staying true to our roots 
                and traditional values.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FiStar className="text-caramel mt-1 flex-shrink-0" />
                  <span className="text-brown">Expand our reach while maintaining quality and authenticity</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiStar className="text-caramel mt-1 flex-shrink-0" />
                  <span className="text-brown">Lead in sustainable and ethical business practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiStar className="text-caramel mt-1 flex-shrink-0" />
                  <span className="text-brown">Inspire joy and create lasting memories for generations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-darkBrown mb-4">Our Values</h2>
            <p className="text-brown text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-darkBrown mb-3">{value.title}</h3>
                <p className="text-brown">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-darkBrown mb-4">Why Choose Us</h2>
            <p className="text-brown text-lg">What makes Cookies Café special</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-cream rounded-lg hover:shadow-lg transition"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-caramel rounded-full flex items-center justify-center text-white">
                    {reason.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkBrown mb-2">{reason.title}</h3>
                  <p className="text-brown text-sm">{reason.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline/Milestones Section */}
      <section className="py-16 bg-brown text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-cream text-lg">Key milestones in our story</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="bg-darkBrown p-6 rounded-lg hover:bg-opacity-80 transition"
              >
                <div className="text-4xl font-bold text-caramel mb-2">{milestone.year}</div>
                <h3 className="text-xl font-semibold mb-2">{milestone.event}</h3>
                <p className="text-cream">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-darkBrown mb-4">Meet Our Team</h2>
            <p className="text-brown text-lg">The passionate people behind Cookies Café</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-darkBrown mb-1">{member.name}</h3>
                  <p className="text-caramel font-semibold mb-3">{member.role}</p>
                  <p className="text-brown text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-caramel mb-2">10+</div>
              <div className="text-brown">Years of Excellence</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-caramel mb-2">50+</div>
              <div className="text-brown">Unique Recipes</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-caramel mb-2">10K+</div>
              <div className="text-brown">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-caramel mb-2">100%</div>
              <div className="text-brown">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-caramel to-brown text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Experience the Magic?</h2>
          <p className="text-xl text-cream mb-8">
            Visit us today and discover why thousands of customers choose Cookies Café 
            for their sweet moments. We can't wait to welcome you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="bg-white text-brown px-8 py-4 rounded-lg hover:bg-cream transition font-semibold text-lg"
            >
              Explore Our Menu
            </Link>
            <Link
              to="/community"
              className="bg-darkBrown text-white px-8 py-4 rounded-lg hover:bg-opacity-90 transition font-semibold text-lg"
            >
              Join Our Community
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-brown transition font-semibold text-lg"
            >
              Visit Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
