FROM node:slim
WORKDIR /app
ENV ENVIRONMENT=production
ENV PORT=3000
ENV JWT_SECRET=testJWTSecret
ENV JWT_EXPIRES_IN=1d
ENV DATABASE_URL=postgresql://qp-assessment_owner:3uNVYFodPt7r@ep-lively-dew-a5mu7ge9.us-east-2.aws.neon.tech/qp-assessment?sslmode=require
RUN apt-get update -qq && \
    apt-get install -y openssl
COPY . /app/
RUN npm install
EXPOSE 3000
CMD npm run prod