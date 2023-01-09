## sm4加密工具（输入utf8，输出base4格式）
#### 目前是在windows电脑上开发测试和开发的，如果是mac，需要注意外面package.json里build的配置

### 1. 开发: (开发模式只需要用到app目录就可以了)
```
cd app
yarn 
yarn serve
yarn dev
```

### 2. 打包：（在最外层目录）
```
cd app
yarn yarn build
cd ../
yarn 
yarn app
```
### 3. 注意打包的时候，终端必须科学上网
```
cmd下配置
set http_proxy=http://127.0.0.1:xxx
set http_proxys=http://127.0.0.1:xxx

重置
set http_proxy=
set http_proxys=

gitbash/shell下配置

export http_proxy=http://127.0.0.1:xxx
export https_proxys=http://127.0.0.1:xxx

重置
export http_proxy=
export http_proxys=

```