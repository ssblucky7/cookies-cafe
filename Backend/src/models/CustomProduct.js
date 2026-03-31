import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CustomProduct = sequelize.define('CustomProduct', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  baseProductId: {
    type: DataTypes.UUID,
    references: {
      model: 'Products',
      key: 'id'
    }
  },
  customizations: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {},
    comment: 'Customization options selected'
  },
  ingredients: {
    type: DataTypes.JSONB,
    defaultValue: [],
    comment: 'Selected ingredients'
  },
  size: {
    type: DataTypes.ENUM('small', 'medium', 'large', 'extra-large'),
    defaultValue: 'medium'
  },
  flavor: {
    type: DataTypes.STRING
  },
  toppings: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  basePrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  customizationPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    comment: 'Generated preview image'
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Share with community'
  },
  isSaved: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Saved to user favorites'
  },
  timesOrdered: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0
  },
  reviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['isPublic']
    },
    {
      fields: ['baseProductId']
    }
  ]
});

export default CustomProduct;
