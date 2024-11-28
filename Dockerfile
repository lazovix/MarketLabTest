FROM node:18.20.3
WORKDIR /app
RUN chown node:node /app
USER node
COPY --chown=node:node . /app
RUN npm install && npm run build
CMD sh -c "npm run start:prod"
