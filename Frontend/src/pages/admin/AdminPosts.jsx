import { useState, useEffect } from 'react';
import apiService from '../../services/apiService';
import { FiTrash2, FiMessageSquare } from 'react-icons/fi';

function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await apiService.admin.getPosts({
        page: currentPage,
        limit: 20
      });
      setPosts(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await apiService.admin.deletePost(postId);
      fetchPosts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete post');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Community Posts</h1>
          <p className="text-gray-600 mt-1">Manage community posts</p>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <FiMessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600">No posts yet</p>
          </div>
        ) : (
          <>
            <div className="divide-y">
              {posts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                          <span className="text-amber-600 font-semibold">
                            {post.user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{post.user?.name}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{post.content}</p>

                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post"
                          className="w-full max-w-md rounded-lg mb-3"
                        />
                      )}

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{post.likes || 0} likes</span>
                        <span>{post.comments || 0} comments</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(post.id)}
                      className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Post"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AdminPosts;
