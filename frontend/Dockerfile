# Build stage
FROM node:23-alpine AS builder

WORKDIR /app

# Accept VITE_WS_URL as build arg
ARG VITE_WS_URL
ENV VITE_WS_URL=$VITE_WS_URL

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Inject VITE_WS_URL into the Vite build
RUN VITE_WS_URL=$VITE_WS_URL npm run build

# Serve with nginx
FROM nginx:1.25-alpine AS runner

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
