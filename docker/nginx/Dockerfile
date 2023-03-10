# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
# Remove default config
RUN rm /etc/nginx/conf.d/*
# run new config
CMD ["nginx", "-g", "daemon off;"] 