import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CommunityPost = sequelize.define('CommunityPost', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  type: {
    type: DataTypes.ENUM('photos', 'reviews', 'stories'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title is required' }
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Content is required' }
    }
  },
  image: {
    type: DataTypes.STRING
  },
  rating: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likedBy: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    defaultValue: []
  },
  comments: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  isTrending: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true
});

export default CommunityPost;
