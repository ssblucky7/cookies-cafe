import { useState, useEffect } from 'react'
import { FiHeart, FiMessageCircle, FiShare2, FiStar, FiTrendingUp, FiCalendar, FiMapPin, FiClock, FiX, FiImage, FiEdit3 } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { communityAPI, eventsAPI } from '../services/apiService'
import ImageUpload from '../components/upload/ImageUpload'

const Community = () => {
  const { user } = useAuth()
  const [selectedPost, setSelectedPost] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showContributeModal, setShowContributeModal] = useState(false)
  const [posts, setPosts] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    type: 'photo',
    imageUrl: '',
    tags: []
  })
  const [submitting, setSubmitting] = useState(false)

  const filters = ['all', 'photos', 'reviews', 'stories']
  const hashtags = ['#SweetMoments', '#CookieLove', '#CafeVibes', '#BakingJoy', '#CommunityLove']

  useEffect(() => {
    fetchPosts()
    fetchEvents()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const { data } = await communityAPI.getAll()
      setPosts(data.data || [])
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchEvents = async () => {
    try {
      const { data } = await eventsAPI.getAll()
      setEvents(data.data || [])
    } catch (error) {
      console.error('Failed to fetch events:', error)
    }
  }

  const handleLike = async (postId) => {
    if (!user) {
      alert('Please login to like posts')
      return
    }

    try {
      const { data } = await communityAPI.like(postId)
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: data.data.likes, isLiked: data.data.isLiked }
          : post
      ))
    } catch (error) {
      console.error('Failed to like post:', error)
    }
  }

  const handleImageUpload = (uploadResult) => {
    setPostForm({ ...postForm, imageUrl: uploadResult.url })
  }

  const handleSubmitPost = async (e) => {
    e.preventDefault()
    
    if (!user) {
      alert('Please login to create posts')
      return
    }

    setSubmitting(true)
    try {
      const { data } = await communityAPI.create(postForm)
      setPosts([data.data, ...posts])
      setShowContributeModal(false)
      setPostForm({ title: '', content: '', type: 'photo', imageUrl: '', tags: [] })
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create post')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredPosts = posts.filter(post => {
    if (activeFilter === 'all') return true
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

        {/* Events & Updates */}
        {events.length > 0 && (
          <section className="mb-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-darkBrown mb-6 flex items-center gap-2">
              <FiCalendar className="text-caramel" /> Upcoming Events
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {events.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="border-2 border-cream rounded-lg p-6 hover:border-caramel transition"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-caramel text-white rounded-lg p-4 text-center min-w-[80px]">
                      <div className="text-2xl font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm">
                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                      </div>
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
        )}

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
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Community Feed */}
        <section>
          <h2 className="text-3xl font-bold text-darkBrown mb-6">Community Feed</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-caramel mx-auto mb-4"></div>
              <p className="text-brown">Loading posts...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <FiImage className="mx-auto text-brown mb-4" size={64} />
              <p className="text-brown text-lg">No posts yet</p>
              <button
                onClick={() => setShowContributeModal(true)}
                className="btn-primary mt-4"
              >
                Be the first to post!
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  {/* Post Image */}
                  {post.imageUrl && (
                    <div
                      className="relative h-64 overflow-hidden cursor-pointer"
                      onClick={() => setSelectedPost(post)}
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition duration-300"
                      />
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-6">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={post.user?.avatar || 'https://via.placeholder.com/50'}
                        alt={post.user?.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold text-darkBrown">{post.user?.name}</h4>
                        <p className="text-sm text-brown">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Post Title & Content */}
                    <h3 className="text-lg font-semibold text-darkBrown mb-2">{post.title}</h3>
                    <p className="text-brown mb-4">{post.content}</p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
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
                          post.isLiked ? 'text-red-500' : 'text-brown hover:text-caramel'
                        }`}
                      >
                        <FiHeart
                          size={20}
                          fill={post.isLiked ? 'currentColor' : 'none'}
                        />
                        <span className="text-sm font-semibold">{post.likes || 0}</span>
                      </button>

                      <button className="flex items-center gap-2 text-brown hover:text-caramel transition">
                        <FiMessageCircle size={20} />
                        <span className="text-sm font-semibold">{post.comments?.length || 0}</span>
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
          )}
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

              <form onSubmit={handleSubmitPost} className="space-y-4">
                <div>
                  <label className="block text-brown font-semibold mb-2">Post Type</label>
                  <select 
                    value={postForm.type}
                    onChange={(e) => setPostForm({ ...postForm, type: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                  >
                    <option value="photo">Photo</option>
                    <option value="review">Review</option>
                    <option value="story">Story</option>
                  </select>
                </div>

                <div>
                  <label className="block text-brown font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    placeholder="Give your post a title..."
                    className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                    required
                  />
                </div>

                <div>
                  <label className="block text-brown font-semibold mb-2">Your Story</label>
                  <textarea
                    rows="4"
                    value={postForm.content}
                    onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                    placeholder="Share your experience..."
                    className="w-full px-4 py-2 rounded-lg border border-brown focus:outline-none focus:ring-2 focus:ring-caramel"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-brown font-semibold mb-2">Upload Photo</label>
                  <ImageUpload
                    onUploadSuccess={handleImageUpload}
                    folder="cookies-cafe/stories"
                    maxSize={10}
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
                    disabled={submitting}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {submitting ? 'Posting...' : 'Post to Community'}
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
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={selectedPost.user?.avatar || 'https://via.placeholder.com/50'}
                    alt={selectedPost.user?.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-darkBrown">{selectedPost.user?.name}</h4>
                    <p className="text-sm text-brown">
                      {new Date(selectedPost.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-darkBrown mb-4">{selectedPost.title}</h3>
                <p className="text-brown mb-4">{selectedPost.content}</p>

                {selectedPost.tags && selectedPost.tags.length > 0 && (
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
                  <h4 className="font-semibold text-darkBrown mb-4">
                    Comments ({selectedPost.comments?.length || 0})
                  </h4>
                  <div className="space-y-4 mb-4">
                    {selectedPost.comments && selectedPost.comments.length > 0 ? (
                      selectedPost.comments.map((comment, idx) => (
                        <div key={idx} className="bg-cream p-4 rounded-lg">
                          <p className="text-sm text-brown">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <div className="bg-cream p-4 rounded-lg">
                        <p className="text-sm text-brown">No comments yet</p>
                      </div>
                    )}
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
