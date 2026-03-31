import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Order = sequelize.define('Order', {
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
  orderNumber: {
    type: DataTypes.STRING,
    unique: true
  },
  items: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },
  shippingAddress: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('card', 'cash', 'qr', 'stripe'),
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  stripePaymentIntentId: {
    type: DataTypes.STRING
  },
  qrCode: {
    type: DataTypes.TEXT
  },
  tableNumber: {
    type: DataTypes.STRING
  },
  orderType: {
    type: DataTypes.ENUM('delivery', 'pickup', 'dine-in'),
    defaultValue: 'delivery'
  },
  estimatedReadyTime: {
    type: DataTypes.DATE
  },
  loyaltyPointsEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  loyaltyPointsUsed: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  itemsPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  taxPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  shippingPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'ready', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending'
  },
  deliveredAt: {
    type: DataTypes.DATE
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (order) => {
      if (!order.orderNumber) {
        const count = await Order.count();
        order.orderNumber = `ORD-${Date.now()}-${count + 1}`;
      }
    }
  }
});

export default Order;
