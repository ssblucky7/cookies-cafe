import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Story = sequelize.define('Story', {
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
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mediaType: {
    type: DataTypes.ENUM('image', 'video'),
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING
  },
  caption: {
    type: DataTypes.TEXT
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 5, // seconds
    comment: 'Display duration in seconds'
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  productTags: {
    type: DataTypes.JSONB,
    defaultValue: [],
    comment: 'Array of tagged product IDs'
  },
  location: {
    type: DataTypes.STRING
  },
  music: {
    type: DataTypes.STRING,
    comment: 'Background music URL'
  },
  filters: {
    type: DataTypes.JSONB,
    defaultValue: {},
    comment: 'Applied filters and effects'
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['expiresAt']
    },
    {
      fields: ['isActive']
    }
  ]
});

export default Story;
