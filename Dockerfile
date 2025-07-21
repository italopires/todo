ARG ELIXIR_VERSION=1.17.2
ARG OTP_VERSION=27.0.1
ARG DEBIAN_VERSION=bullseye-20240904-slim

# Build stage
FROM hexpm/elixir:${ELIXIR_VERSION}-erlang-${OTP_VERSION}-debian-${DEBIAN_VERSION} AS build

WORKDIR /app

# Install build dependencies
RUN apt-get update && \
    apt-get install -y build-essential git curl nodejs npm postgresql-client && \
    apt-get clean && rm -f /var/lib/apt/lists/*_*

# Instala Hex e Rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Copia arquivos para instalar deps (apenas os arquivos do mix)
COPY mix.exs mix.lock ./
COPY config config
RUN mix deps.get

# Copia o restante (mas será sobrescrito no volume)
COPY . .

# Instala node_modules e compila assets uma vez
WORKDIR /app/assets
# RUN npm install

WORKDIR /app

# The command to run the application
# CMD ["sh", "-c", "/app/bin/server"]