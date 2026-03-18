import { useState } from 'react'
import { FiHeart, FiMessageCircle, FiShare2, FiStar, FiTrendingUp, FiCalendar, FiMapPin, FiClock, FiX, FiImage, FiEdit3 } from 'react-icons/fi'
import { communityPosts, communityEvents, featuredStories } from '../utils/communityData'

const Community = () => {
  const [selectedPost, setSelectedPost] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showContributeModal, setShowContributeModal] = useState(false)
  const [likedPosts, setLikedPosts] = useState([])

  const filters = ['all', 'photos', 'reviews', 'stories', 'trending']
  const hashtags = ['#SweetMoments', '#CookieLove', '#CafeVibes', '#BakingJoy', '#CommunityLove']

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  const filteredPosts = communityPosts.filter(post => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'trending') return post.trending
    return post.type === activeFilter
  })

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-80 bg-gradient-to-r from-brown to-darkBrown overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1920"
            alt="Community"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Community</h1>
            <p className="text-xl md:text-2xl text-cream mb-6">
              Share your sweet moments with us
            </p>
            <button
              onClick={() => setShowContributeModal(true)}
              className="bg-caramel hover:bg-cream hover:text-brown text-white px-8 py-3 rounded-lg transition font-semibold flex items-center gap-2"
            >
              <FiEdit3 /> Share Your Story
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hashtags Section */}
        <div className="mb-8 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            {hashtags.map((tag, index) => (
              <span
                key={index}
                className="bg-white text-brown px-4 py-2 rounded-full text-sm font-semibold hover:bg-caramel hover:text-white transition cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Stories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-darkBrown mb-6 flex items-center gap-2">
            <FiStar className="text-caramel" /> Featured Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-caramel text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={story.userAvatar}
                      alt={story.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-darkBrown">{story.userName}</h4>
                      <p className="text-sm text-brown">{story.date}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-darkBrown mb-2">{story.title}</h3>
                  <p className="text-brown mb-4">{story.excerpt}</p>
                  <button className="text-caramel font-semibold hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events & Updates */}
        <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-darkBrown mb-6 flex items-center gap-2">
            <FiCalendar className="text-caramel" /> Upcoming Events
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {communityEvents.map((event) => (
              <div
                key={event.id}
                className="border-2 border-cream rounded-lg p-6 hover:border-caramel transition"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-caramel text-white rounded-lg p-4 text-center min-w-[80px]">
                    <div className="text-2xl font-bold">{event.day}</div>
                    <div className="text-sm">{event.month}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-darkBrown mb-2">{event.title}</h3>
                    <p className="text-brown mb-3">{event.description}</p>
                    <div className="space-y-2 text-sm text-brown">
                      <div className="flex items-center gap-2">
                        <FiClock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiMapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <button className="mt-4 bg-caramel text-white px-6 py-2 rounded-lg hover:bg-brown transition">
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-lg font-semibold capitalize transition ${
                  activeFilter === filter
                    ? 'bg-caramel text-white'
                    : 'bg-white text-brown hover:bg-cream'
                }`}
              >
                {filter === 'trending' && <FiTrendingUp className="inline mr-2" />}
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Community Feed */}
        <section>
          <h2 className="text-3xl font-bold text-darkBrown mb-6">Community Feed</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {/* Post Image */}
                {post.image && (
                  <div
                    className="relative h-64 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition duration-300"
                    />
                    {post.trending && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                        <FiTrendingUp size={14} /> Trending
                      </div>
                    )}
                  </div>
                )}

                {/* Post Content */}
                <div className="p-6">
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={post.userAvatar}
                      alt={post.userName}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-darkBrown">{post.userName}</h4>
                      <p className="text-sm text-brown">{post.date}</p>
                    </div>
                  </div>

                  {/* Post Title & Content */}
                  <h3 className="text-lg font-semibold text-darkBrown mb-2">{post.title}</h3>
                  <p className="text-brown mb-4">{post.content}</p>

                  {/* Rating (for reviews) */}
                  {post.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-caramel">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            size={18}
                            fill={i < post.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-brown">({post.rating}/5)</span>
                    </div>
                  )}

                  {/* Tags */}
                  {post.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-cream text-brown px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Engagement Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-cream">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 transition ${
                        likedPosts.includes(post.id)
                          ? 'text-red-500'
                          : 'text-brown hover:text-caramel'
                      }`}
                    >
                      <FiHeart
                        size={20}
                        fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'}
                      />
                      <span className="text-sm font-semibold">
                        {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                      </span>
                    </button>

                    <button className="flex items-center gap-2 text-brown hover:text-caramel transition">
                      <FiMessageCircle size={20} />
                      <span className="text-sm font-semibold">{post.comments}</span>
                    </button>

                    <button className="flex items-center gap-2 text-brown hover:text-caramel transition">
                      <FiShare2 size={20} />
                      <span className="text-sm font-semibold">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-primary">
              Load More Posts
            </button>
          </div>
        </section>
      </div>

      {/* Contribute Modal */}
      {showContributeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-darkBrown">Share Your Story</h3>
                <button
                  onClick={() => setShowContributeModal(false)}
                  className="text-brown hover:text-caramel"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-brown font-semibold mb-2">Post Type</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel">
                    <option>Photo</option>
                    <option>Review</option>
                    <option>Story</option>
                  </select>
                </div>

                <div>
                  <label className="block text-brown font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Give your post a title..."
                    className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                  />
                </div>

                <div>
                  <label className="block text-brown font-semibold mb-2">Your Story</label>
                  <textarea
                    rows="4"
                    placeholder="Share your experience..."
                    className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-brown font-semibold mb-2">Rating (Optional)</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="text-caramel hover:scale-110 transition"
                      >
                        <FiStar size={32} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-brown font-semibold mb-2">Upload Photo</label>
                  <div className="border-2 border-dashed border-brown rounded-lg p-8 text-center hover:border-caramel transition cursor-pointer">
                    <FiImage size={48} className="mx-auto text-brown mb-2" />
                    <p className="text-brown">Click to upload or drag and drop</p>
                    <p className="text-sm text-brown mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                <div>
                  <label className="block text-brown font-semibold mb-2">Tags</label>
                  <input
                    type="text"
                    placeholder="#SweetMoments #CookieLove"
                    className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContributeModal(false)}
                    className="flex-1 bg-gray-200 text-brown px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary"
                  >
                    Post to Community
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Post Detail Modal */}
      {selectedPost && (
        <div
          onClick={() => setSelectedPost(null)}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-white hover:text-caramel z-10"
            >
              <FiX size={32} />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="bg-black">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={selectedPost.userAvatar}
                    alt={selectedPost.userName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-darkBrown">{selectedPost.userName}</h4>
                    <p className="text-sm text-brown">{selectedPost.date}</p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-darkBrown mb-4">{selectedPost.title}</h3>
                <p className="text-brown mb-4">{selectedPost.content}</p>

                {selectedPost.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-caramel">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          size={20}
                          fill={i < selectedPost.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="text-brown">({selectedPost.rating}/5)</span>
                  </div>
                )}

                {selectedPost.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedPost.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-cream text-brown px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="border-t border-cream pt-4">
                  <h4 className="font-semibold text-darkBrown mb-4">Comments ({selectedPost.comments})</h4>
                  <div className="space-y-4 mb-4">
                    <div className="bg-cream p-4 rounded-lg">
                      <p className="text-sm text-brown">Comments section coming soon...</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="flex-1 px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                    />
                    <button className="bg-caramel text-white px-6 py-2 rounded-lg hover:bg-brown transition">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Community
