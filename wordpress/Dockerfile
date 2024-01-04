FROM php:8.3.1-fpm

LABEL maintainer="Riza <hanirizo@gmail.com>"
ENV DEBIAN_FRONTEND noninteractive

RUN apt update; apt upgrade -y; \
    apt -y install \
    unzip \
    zlib1g-dev \
    libzip-dev \
    libpng-dev \
    libsodium-dev \
    libicu-dev \
    libpq-dev \
    libxml2-dev \
    nginx \
    git \
    rsync


RUN docker-php-ext-install \
    sockets \
    pcntl \
    zip \
    gd \
    pcntl \
    sodium \
    bcmath \
    calendar \
    exif \
    gd \
    intl \
    pdo_mysql \
    pdo_pgsql \
    pcntl \
    soap \
    zip \
    mysqli

ENV S6_OVERLAY_VERSION=3.1.0.1
ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz /tmp
RUN tar -C / -Jxpf /tmp/s6-overlay-noarch.tar.xz
ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-x86_64.tar.xz /tmp
RUN tar -C / -Jxpf /tmp/s6-overlay-x86_64.tar.xz


WORKDIR /home

COPY ./app /home
COPY ./conf/phpfpm/php-fpm.d /usr/local/etc/php-fpm.d
COPY ./conf/phpfpm/php-fpm.conf /usr/local/etc/php-fpm.conf
COPY ./conf/nginx/nginx.conf /etc/nginx/nginx.conf

COPY ./conf/s6/nginx /etc/services.d/nginx
COPY ./conf/s6/fpm /etc/services.d/fpm

ENTRYPOINT [ "/init" ]