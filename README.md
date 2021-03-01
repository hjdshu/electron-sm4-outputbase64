### 这是一个简易的electron开发的脚手架，默认是使用的vue模板
改成react或者其他框架只需要注意保留app里的main.js和preload.js 将其他文件替换为react的开发模板就可以了，另外注意main.js里面的入口加载路径
```
  // and load the index.html of the app.
  // 开发环境
  if (!app.isPackaged) {
    mainWindow.loadURL('http://localhost:3939/')
    // Open the DevTools.
    mainWindow.webContents.openDevTools()
  } else {
    // 打包环境
    mainWindow.loadFile('./dist/index.html')
  }

```
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