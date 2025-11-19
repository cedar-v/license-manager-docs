# 快速开始

## GitHub 镜像快速部署指南

### 1. 获取部署文件

复制项目根目录的 `docker-compose.github.image.yml` 文件到你的部署目录：

```bash
# 方式一：直接下载
curl -O https://raw.githubusercontent.com/cedar-v/license-manager/main/docker-compose.github.image.yml

# 方式二：从项目中复制
cp docker-compose.github.image.yml /your/deploy/path/
```

### 2. 提取配置文件

```bash
# 提取后端配置文件
mkdir -p backend-config
docker run --rm -v $(pwd)/backend-config:/tmp/config ghcr.io/cedar-v/license-manager-backend:v1.0.0 sh -c "cp -r /app/backend/configs/* /tmp/config/"

# 提取前端 nginx 配置文件
docker run --rm -v $(pwd):/tmp/extract ghcr.io/cedar-v/license-manager-frontend:v1.0.0 sh -c "cp /etc/nginx/conf.d/default.conf /tmp/extract/nginx.conf"
```

### 3. 启动服务

```bash
docker-compose -f docker-compose.github.image.yml up

# 如果提示命令错误尝试如下
docker compose -f docker-compose.github.image.yml up
```

>注意：启动如果报错数据库连接失败，请重启执行启动服务命令一次

## 访问信息

- **前端**: http://localhost:18080
- **后端 API**: http://localhost:18888
- **默认账号**: admin / admin@123
