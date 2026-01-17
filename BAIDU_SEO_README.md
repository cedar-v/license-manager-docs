# 百度SEO配置指南

## 1. 百度统计配置

### 获取百度统计ID
1. 访问 [百度统计](https://tongji.baidu.com/)
2. 注册账号并登录
3. 点击"添加网站"
4. 填写网站信息：
   - 网站域名：`docs.lm.cedar-v.com`
   - 网站名称：`License Manager`
5. 复制统计代码中的ID（格式类似：`12345678`）

### 配置统计代码
在 `docs/.vitepress/config.mjs` 文件中配置统计代码（`head`），将统计 ID 替换为实际的统计ID：

```typescript
hm.src = "https://hm.baidu.com/hm.js?你的统计ID";
```

## 2. 百度搜索资源平台验证

### 获取验证代码
1. 访问 [百度搜索资源平台](https://ziyuan.baidu.com/)
2. 登录账号
3. 添加站点 `docs.lm.cedar-v.com`
4. 获取验证代码

### 配置验证代码
在 `docs/.vitepress/config.mjs` 文件中配置验证代码（`head`），将验证代码替换为实际的验证代码：

```typescript
['meta', { name: 'baidu-site-verification', content: '你的验证代码' }],
```

### HTML文件验证（可选）
百度支持“验证文件”方式：平台会给你一个**指定文件名**（通常形如 `baidu_verify_xxx.html`）和文件内容要求。

如果你选择这种方式：在 `docs/public/` 下新建对应文件（文件名和内容都按百度提供的来），构建后它会出现在站点根路径（`/baidu_verify_xxx.html`）。

## 3. 网站提交

### 提交Sitemap
1. 在百度搜索资源平台提交 sitemap：`https://docs.lm.cedar-v.com/sitemap.xml`
2. 提交robots.txt：`https://docs.lm.cedar-v.com/robots.txt`

### 主动推送
可以使用百度链接提交工具推送重要页面。

## 4. 优化建议

### 内容优化
- 确保页面标题准确描述内容
- 使用中文关键词优化
- 保持内容质量和原创性

### 技术优化
- 确保网站响应速度快
- 使用HTTPS协议
- 移动端适配良好

### 监控效果
- 定期查看百度统计数据
- 关注百度搜索排名变化
- 分析用户访问行为

## 5. 常用工具

- [百度统计](https://tongji.baidu.com/) - 网站流量分析
- [百度搜索资源平台](https://ziyuan.baidu.com/) - 网站提交和优化
- [百度站长工具](https://zhanzhang.baidu.com/) - 网站诊断
- [百度移动适配测试](https://m.baidu.com/ssldev/) - 移动端测试

## 6. 注意事项

- 统计代码需要在网站上线后才能收集数据
- 百度收录需要一定时间，请耐心等待
- 定期更新sitemap保持最新内容
- 遵守百度搜索引擎优化指南，避免违规操作
