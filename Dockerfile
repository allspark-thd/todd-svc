FROM node:5
ADD build.js /app.js
ADD package.json /package.json
RUN npm install --production
ENTRYPOINT [ "node", "/app" ]

