# 自行部署：社区版部署指南

## 选择部署方式

**本页教程部署的是社区版，不是企业版。**

- **社区版自行部署**：使用公开项目的 GitHub 镜像，按下方步骤部署。
- **企业版私有化部署**：请[联系我们](https://cedar-v.com/products/cedar-license-cloud/#service)获取部署与交付方案，不使用本页社区版教程。

如果您希望使用雪松授权云给现有软件加上使用期限控制，可以直接按[快速开始](./getting-started.md)注册并接入，无需执行本页部署步骤。

## 社区版 GitHub 镜像部署步骤

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

如果启动时无法连接数据库，请先确认数据库已就绪，并检查容器日志和连接配置，再重试启动。

## 访问信息

- **前端**: http://localhost:18080
- **后端 API**: http://localhost:18888
- **默认账号**: admin / admin@123

首次登录后请立即修改默认密码，再开放访问。部署完成后，继续阅读[操作指南](./operating_guide.md)和[AI 接入指南](/developer/ai-quickstart.md)。
