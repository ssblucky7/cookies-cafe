#!/bin/bash

echo "🚀 Starting Production Deployment for Cookies Cafe Backend..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if NODE_ENV is set to production
if [ "$NODE_ENV" != "production" ]; then
  echo -e "${RED}❌ ERROR: NODE_ENV must be set to 'production'${NC}"
  echo "Run: export NODE_ENV=production"
  exit 1
fi

echo -e "${GREEN}✓ Environment: $NODE_ENV${NC}"

# Check if required environment variables are set
required_vars=("DATABASE_URL" "JWT_SECRET" "STRIPE_SECRET_KEY" "OPENAI_API_KEY" "CLOUDINARY_CLOUD_NAME")

for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo -e "${RED}❌ ERROR: $var is not set${NC}"
    exit 1
  fi
done

echo -e "${GREEN}✓ All required environment variables are set${NC}"

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed to install dependencies${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Dependencies installed${NC}"

# Test database connection
echo -e "${YELLOW}🔌 Testing database connection...${NC}"
node test-connection.js

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Database connection failed${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Database connected${NC}"

# Run database synchronization
echo -e "${YELLOW}🗄️  Synchronizing database...${NC}"
node sync-db.js

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Database synchronization failed${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Database synchronized${NC}"

# Add database indexes
echo -e "${YELLOW}📊 Creating database indexes...${NC}"
node src/migrations/add-indexes.js

if [ $? -ne 0 ]; then
  echo -e "${YELLOW}⚠️  Warning: Index creation had issues (may already exist)${NC}"
fi

echo -e "${GREEN}✓ Database indexes processed${NC}"

# Create logs directory
echo -e "${YELLOW}📝 Setting up logging...${NC}"
mkdir -p logs
chmod 755 logs

echo -e "${GREEN}✓ Logging configured${NC}"

# Health check
echo -e "${YELLOW}🏥 Running health check...${NC}"
sleep 2

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${GREEN}Starting server...${NC}"

# Start the server
npm start
