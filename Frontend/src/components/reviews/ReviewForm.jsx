import { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { reviewsAPI } from '../../services/apiService';

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please login to submit a review');
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await reviewsAPI.create({
        product: productId,
        rating,
        comment
      });

      setRating(0);
      setComment('');
      onReviewSubmitted(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-cream border border-brown rounded-lg p-6 text-center">
        <p className="text-brown mb-4">Please login to write a review</p>
        <a href="/login" className="btn-primary inline-block">
          Login
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brown rounded-lg p-6">
      <h3 className="text-xl font-bold text-darkBrown mb-4">Write a Review</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-brown font-semibold mb-2">Your Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <FiStar
                size={32}
                className={`${
                  star <= (hoveredRating || rating)
                    ? 'text-caramel fill-caramel'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label className="block text-brown font-semibold mb-2">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full px-4 py-2 border border-brown rounded-lg focus:outline-none focus:ring-2 focus:ring-caramel"
          placeholder="Share your experience with this product..."
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
