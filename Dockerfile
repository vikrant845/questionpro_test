FROM node:slim
WORKDIR /app
ENV ENVIRONMENT=development
ENV PORT=3000
ENV JWT_SECRET=testJWTSecret
ENV JWT_EXPIRES_IN=1d
ENV DATABASE_URL=YOUR_DB_URL
RUN apt-get update -qq && \
    apt-get install -y openssl
COPY . /app/
RUN npm install
EXPOSE 3000
CMD npm run dev