# Getting Started

## Quick Deployment with GitHub Images

### 1. Get Deployment Files

Copy the `docker-compose.github.image.yml` file from the project root to your deployment directory:

```bash
# Method 1: Direct download
curl -O https://raw.githubusercontent.com/cedar-v/license-manager/main/docker-compose.github.image.yml

# Method 2: Copy from project
cp docker-compose.github.image.yml /your/deploy/path/
```

### 2. Extract Configuration Files

```bash
# Extract backend configuration files
mkdir -p backend-config
docker run --rm -v $(pwd)/backend-config:/tmp/config ghcr.io/cedar-v/license-manager-backend:v0.1.0 sh -c "cp -r /app/backend/configs/* /tmp/config/"

# Extract frontend nginx configuration file
docker run --rm -v $(pwd):/tmp/extract ghcr.io/cedar-v/license-manager-frontend:v0.1.0 sh -c "cp /etc/nginx/conf.d/default.conf /tmp/extract/nginx.conf"
```

### 3. Start Services

```bash
docker-compose -f docker-compose.github.image.yml up
```

## Access Information

- **Frontend**: http://localhost:18080
- **Backend API**: http://localhost:18888
- **Default Account**: admin / admin@123
