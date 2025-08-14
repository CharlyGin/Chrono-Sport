FROM oven/bun:debian AS builder

RUN apt update && apt install -y procps

COPY package.json ./
COPY src ./src
COPY public ./public
COPY tsconfig.* ./
COPY index.html ./
COPY vite.config.ts ./

RUN bun install --ignore-scripts
RUN bun run build

CMD ["bash"]

FROM nginx:stable-alpine-slim

LABEL org.opencontainers.image.title="Chrono Sport"
LABEL org.opencontainers.image.description="Web application for HIIT training"
LABEL org.opencontainers.image.authors="support@charly-ginevra.fr"
LABEL org.opencontainers.image.url="https://hub.docker.com/r/carlitog/chrono-sport"
LABEL org.opencontainers.image.source="https://github.com/CharlyGin/Chrono-Sport"
LABEL org.opencontainers.image.documentation="https://github.com/CharlyGin/Chrono-Sport/blob/main/README.md"
LABEL org.opencontainers.image.licenses="MIT"

COPY --from=builder /home/bun/app/dist /usr/share/nginx/html

RUN <<EOF cat > /etc/nginx/conf.d/default.conf
server { 
    listen 80; 

    location / { 
        root /usr/share/nginx/html; 
        index index.html; 
        
        try_files \$uri \$uri/ /index.html; 
    } 
}
EOF

CMD [ "nginx", "-g", "daemon off;" ]

EXPOSE 80