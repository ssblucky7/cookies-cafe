import { FiStar, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const ReviewList = ({ reviews, onDelete }) => {
  const { user } = useAuth();

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <FiStar className="mx-auto text-brown mb-4" size={64} />
        <p className="text-brown text-lg">No reviews yet</p>
        <p className="text-brown text-sm">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white border border-brown rounded-lg p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={review.user?.avatar || 'https://via.placeholder.com/50'}
                alt={review.user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-darkBrown">{review.user?.name || 'Anonymous'}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex text-caramel">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        size={16}
                        className={i < review.rating ? 'fill-caramel' : ''}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-brown">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Delete button for own reviews or admin */}
            {(user?.id === review.userId || user?.role === 'admin') && (
              <button
                onClick={() => onDelete(review.id)}
                className="text-red-600 hover:text-red-800 transition"
                title="Delete review"
              >
                <FiTrash2 size={18} />
              </button>
            )}
          </div>

          <p className="text-brown">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
