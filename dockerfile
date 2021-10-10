FROM node:15.6-alpine
WORKDIR .
ENV PATH = "./node_modules/.bin:$PATH"
COPY . .
EXPOSE 3001
RUN npm run build


CMD [ "npm", "start" ]

