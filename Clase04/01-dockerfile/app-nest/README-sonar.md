# Dockerfile con Análisis de SonarQube

Este directorio contiene una versión mejorada del Dockerfile que incluye análisis de código con SonarQube como parte del proceso de construcción de la imagen.

## Archivos incluidos

- `Dockerfile.sonar` - Dockerfile multi-stage con análisis de SonarQube
- `sonar-project.properties` - Configuración del proyecto SonarQube
- `build-with-sonar.sh` - Script para construir la imagen con SonarQube
- `README-sonar.md` - Este archivo de documentación

## Características

### ✅ Análisis de Código Obligatorio
- El análisis de SonarQube se ejecuta antes del stage de build
- Si el Quality Gate no pasa, la construcción falla y no se genera la imagen
- Incluye análisis de cobertura de código si está disponible

### 🏗️ Multi-Stage Build Optimizado
- **stage-dependencies-dev**: Instala todas las dependencias incluyendo dev
- **stage-sonar-analysis**: Ejecuta análisis de SonarQube con Quality Gate
- **stage-dependencies**: Instala solo dependencias de producción
- **stage-build**: Compila la aplicación (solo si SonarQube pasa)
- **stage-production**: Imagen final optimizada

### 🔒 Seguridad Mejorada
- Usuario no root en la imagen final
- Dependencias de desarrollo no incluidas en la imagen final

## Prerrequisitos

### 1. SonarQube Server
Iniciar SonarQube localmente:
```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:community
```

Acceder a http://localhost:9000 (admin/admin por defecto)

### 2. Variables de Entorno
```bash
export SONAR_HOST_URL="http://localhost:9000"
export SONAR_TOKEN="your-sonar-token"  # Opcional, puede usar login/password
```

## Uso

### Método 1: Script Automatizado
```bash
# Dar permisos de ejecución
chmod +x build-with-sonar.sh

# Construir imagen
./build-with-sonar.sh
```

### Método 2: Docker Build Manual
```bash
docker build \
  --build-arg SONAR_HOST_URL="http://localhost:9000" \
  --build-arg SONAR_PROJECT_KEY="app-nest" \
  -f Dockerfile.sonar \
  -t img-nest-sonar \
  .
```

### Método 3: Con Docker Compose
```yaml
version: '3.8'
services:
  sonarqube:
    image: sonarqube:community
    ports:
      - "9000:9000"
    environment:
      - SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true

  app-build:
    build:
      context: .
      dockerfile: Dockerfile.sonar
      args:
        - SONAR_HOST_URL=http://sonarqube:9000
        - SONAR_PROJECT_KEY=app-nest
    depends_on:
      - sonarqube
```

## Configuración de SonarQube

### Configuración Básica (sonar-project.properties)
```properties
sonar.projectKey=app-nest
sonar.projectName=NestJS Application
sonar.sources=src
sonar.exclusions=**/node_modules/**,**/dist/**,**/*.spec.ts
```

### Variables de Entorno Personalizables
- `SONAR_HOST_URL`: URL del servidor SonarQube
- `SONAR_PROJECT_KEY`: Clave única del proyecto
- `SONAR_PROJECT_NAME`: Nombre del proyecto
- `SONAR_SOURCES`: Directorio de código fuente
- `SONAR_EXCLUSIONS`: Archivos/directorios a excluir

## Quality Gates

El Dockerfile incluye `sonar.qualitygate.wait=true` que:
- ✅ Espera a que el análisis complete
- ✅ Verifica que el Quality Gate pase
- ❌ Falla la construcción si no cumple los criterios

### Quality Gates por Defecto
- Cobertura de código > 80%
- Duplicación de código < 3%
- Maintainability Rating A
- Reliability Rating A
- Security Rating A

## Troubleshooting

### Error: "No se puede conectar a SonarQube"
```bash
# Verificar que SonarQube esté ejecutándose
curl http://localhost:9000/api/system/status

# Iniciar SonarQube si no está corriendo
docker run -d --name sonarqube -p 9000:9000 sonarqube:community
```

### Error: "Quality Gate Failed"
- Revisar los resultados en la interfaz de SonarQube
- Corregir los problemas de código identificados
- Volver a ejecutar la construcción

### Error: "sonar-scanner: command not found"
- El scanner se instala automáticamente en el Dockerfile
- Verificar que la imagen base tenga acceso a npm

## Ejemplo de Construcción Exitosa

```bash
$ ./build-with-sonar.sh
🔍 Construyendo imagen con análisis de SonarQube...
📡 Verificando conectividad con SonarQube...
✅ SonarQube está disponible
🏗️  Construyendo imagen...
[+] Building 45.2s (19/19) FINISHED
✅ Imagen construida exitosamente: img-nest-sonar
🚀 Para ejecutar: docker run -d --name server-nest-sonar -p 3000:3000 img-nest-sonar
```

## Ejecutar la Aplicación

```bash
# Ejecutar contenedor
docker run -d --name server-nest-sonar -p 3000:3000 img-nest-sonar

# Verificar logs
docker logs server-nest-sonar

# Acceder a la aplicación
curl http://localhost:3000
```