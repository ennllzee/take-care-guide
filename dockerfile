FROM node:15.6-alpine AS development
# Add a work directory
WORKDIR .
# Cache and Install dependencies
COPY package.json ./
COPY . .
RUN npm install
RUN npm run build
# Copy app files

# Expose port   
EXPOSE 3001
# Start the app
CMD [ "npm", "start" ]



