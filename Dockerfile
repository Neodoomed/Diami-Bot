FROM node:alpine

# Crear directorio
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installar dependencies
COPY package.json /usr/src/app/
RUN npm install

# Copiar archivos
COPY . /usr/src/app/

# Ejecutar el programa
CMD ["npm", "run",  "start:railway"]