# Usar imagen oficial de Python 3.11-slim como base
FROM python:3.11-slim

# Establecer información del mantenedor
LABEL maintainer="Docker Course Group20"
LABEL description="API REST con Python Flask"
LABEL version="1.0.0"

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar dependencias del sistema si es necesario
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar archivo de requerimientos primero (para aprovechar cache de Docker)
COPY app/requirements.txt .

# Instalar dependencias de Python
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiar el código de la aplicación
COPY app/ .

# Crear usuario no-root para mayor seguridad
RUN adduser --disabled-password --gecos '' --uid 1001 appuser && \
    chown -R appuser:appuser /app
USER appuser

# Exponer el puerto en el que correrá la aplicación
EXPOSE 5000

# Configurar variables de entorno
ENV FLASK_APP=main.py
ENV FLASK_ENV=production
ENV PORT=5000

# Comando de healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Comando para ejecutar la aplicación
CMD ["python", "main.py"]