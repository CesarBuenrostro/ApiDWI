# Usamos la imagen oficial de Node.js 20
FROM node:20.11.0

# Crear directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --production

# Copiar todo el código fuente al contenedor
COPY . .

# Exponer el puerto que usa la API
EXPOSE 3000

# Comando para arrancar la API
CMD ["node", "server.js"]
