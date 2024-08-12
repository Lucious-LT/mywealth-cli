# Common build stage
FROM node:21.6.0-alpine3.19 as common-build-stage

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 3000

## Development build stage
#FROM common-build-stage as development-build-stage
#
#ENV NODE_ENV development
#
#CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

# This mode takes too long to build
# ENV NODE_ENV production

# Then build requires the following environment variables however they are injected via the manifest at run time
ENV SKIP_ENV_VALIDATION true

# Generate build
RUN npm i sharp
RUN npm run build

# Production final stage
FROM production-build-stage

# ENV NODE_ENV production

# This will force the next auth module to use the X-Forwarded-Host header and not look for the NEXTAUTH_URL env variable
# The ingress is then configured to set the X-Forwarded-Proto header to https so that the auth module can generate the correct callback url
# ENV AUTH_TRUST_HOST true
# ENV VERCEL true


# Start server
CMD ["npm", "run", "start"]
#CMD ["npm", "run", "dev"]
# The standalone server is not working properly as it does not include and serve the static files
# CMD ["node", ".next/standalone/server.js"]
