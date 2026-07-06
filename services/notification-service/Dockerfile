FROM node:18

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source
COPY . .

EXPOSE 5005

CMD ["npm", "start"]