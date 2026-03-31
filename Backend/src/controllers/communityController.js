import { CommunityPost, User } from '../models/index.js';
import { Op } from 'sequelize';

// @desc    Get all community posts
// @route   GET /api/community
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const { type, trending } = req.query;
    
    let where = { isApproved: true };

    if (type && type !== 'all') {
      where.type = type;
    }

    if (trending === 'true') {
      where.isTrending = true;
    }

    const posts = await CommunityPost.findAll({
      where,
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'avatar']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single post
// @route   GET /api/community/:id
// @access  Public
export const getPost = async (req, res) => {
  try {
    const post = await CommunityPost.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'avatar']
      }]
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create post
// @route   POST /api/community
// @access  Private
export const createPost = async (req, res) => {
  try {
    const post = await CommunityPost.create({
      ...req.body,
      userId: req.user.id,
    });

    const populatedPost = await CommunityPost.findByPk(post.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'avatar']
      }]
    });

    res.status(201).json({
      success: true,
      data: populatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update post
// @route   PUT /api/community/:id
// @access  Private
export const updatePost = async (req, res) => {
  try {
    let post = await CommunityPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check ownership
    if (post.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post',
      });
    }

    await post.update(req.body);

    post = await CommunityPost.findByPk(post.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'avatar']
      }]
    });

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/community/:id
// @access  Private
export const deletePost = async (req, res) => {
  try {
    const post = await CommunityPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // Check ownership
    if (post.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post',
      });
    }

    await post.destroy();

    res.status(200).json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Like/Unlike post
// @route   PUT /api/community/:id/like
// @access  Private
export const toggleLike = async (req, res) => {
  try {
    const post = await CommunityPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const likedBy = post.likedBy || [];
    const likedIndex = likedBy.indexOf(req.user.id);

    if (likedIndex > -1) {
      // Unlike
      likedBy.splice(likedIndex, 1);
      post.likes = likedBy.length;
      post.likedBy = likedBy;
    } else {
      // Like
      likedBy.push(req.user.id);
      post.likes = likedBy.length;
      post.likedBy = likedBy;
    }

    await post.save();

    res.status(200).json({
      success: true,
      data: { likes: post.likes, isLiked: likedIndex === -1 },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Add comment
// @route   POST /api/community/:id/comment
// @access  Private
export const addComment = async (req, res) => {
  try {
    const post = await CommunityPost.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    const comment = {
      user: req.user.id,
      text: req.body.text,
      createdAt: new Date(),
    };

    const comments = post.comments || [];
    comments.push(comment);
    post.comments = comments;

    await post.save();

    const updatedPost = await CommunityPost.findByPk(post.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'avatar']
      }]
    });

    res.status(201).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
