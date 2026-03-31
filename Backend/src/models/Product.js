import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Product name is required' }
    }
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fullDescription: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  oldPrice: {
    type: DataTypes.DECIMAL(10, 2)
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800'
  },
  gallery: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  badge: {
    type: DataTypes.ENUM('Hot', 'New', 'Sale', 'Offer', 'Discount'),
    allowNull: true
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  numReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  popularity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 100,
    validate: {
      min: 0
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  hooks: {
    beforeValidate: (product) => {
      if (product.name) {
        product.slug = product.name.toLowerCase().replace(/\s+/g, '-');
      }
    }
  }
});

// Virtual for discount percentage
Product.prototype.getDiscountPercentage = function() {
  if (this.oldPrice && this.oldPrice > this.price) {
    return Math.round(((this.oldPrice - this.price) / this.oldPrice) * 100);
  }
  return 0;
};

export default Product;
