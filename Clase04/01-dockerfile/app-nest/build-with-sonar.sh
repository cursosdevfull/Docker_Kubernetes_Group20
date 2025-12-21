#!/bin/bash

# Script para construir imagen con análisis de SonarQube
# Uso: ./build-with-sonar.sh

set -e

echo "🔍 Construyendo imagen con análisis de SonarQube..."

# Variables de configuración (puedes ajustarlas)
SONAR_HOST_URL="${SONAR_HOST_URL:-http://localhost:9000}"
SONAR_TOKEN="${SONAR_TOKEN:-your-sonar-token}"
IMAGE_NAME="${IMAGE_NAME:-img-nest-sonar}"

# Verificar que SonarQube esté disponible
echo "📡 Verificando conectividad con SonarQube..."
if ! curl -f -s "$SONAR_HOST_URL/api/system/status" > /dev/null; then
    echo "❌ Error: No se puede conectar a SonarQube en $SONAR_HOST_URL"
    echo "   Asegúrate de que SonarQube esté ejecutándose."
    echo "   Puedes iniciarlo con: docker run -d --name sonarqube -p 9000:9000 sonarqube:community"
    exit 1
fi

echo "✅ SonarQube está disponible"

# Construir imagen con análisis de SonarQube
echo "🏗️  Construyendo imagen..."
docker build \
    --build-arg SONAR_HOST_URL="$SONAR_HOST_URL" \
    --build-arg SONAR_TOKEN="$SONAR_TOKEN" \
    --build-arg SONAR_PROJECT_KEY="app-nest" \
    --build-arg SONAR_PROJECT_NAME="NestJS Application" \
    -f Dockerfile.sonar \
    -t "$IMAGE_NAME" \
    .

if [ $? -eq 0 ]; then
    echo "✅ Imagen construida exitosamente: $IMAGE_NAME"
    echo "🚀 Para ejecutar: docker run -d --name server-nest-sonar -p 3000:3000 $IMAGE_NAME"
else
    echo "❌ Error en la construcción. Posibles causas:"
    echo "   - El análisis de SonarQube falló (Quality Gate no pasó)"
    echo "   - Error en la compilación del código"
    echo "   - Problemas de conectividad con SonarQube"
fi