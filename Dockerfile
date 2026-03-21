# Stage 1: Build the React app
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build-time env vars (VITE_ prefix)
ARG VITE_API_URL
ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_TEMPLATE_GUIDE
ARG VITE_EMAILJS_TEMPLATE_CHALLENGE
ARG VITE_AIRTABLE_API_KEY
ARG VITE_AIRTABLE_BASE_ID
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG VITE_GUIDE_PDF_URL

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY rol-nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
