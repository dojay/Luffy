# GUI

## 本项目所用到的东西，以及相关文档

* [electron](https://electronjs.org/docs)：构建桌面应用的壳子
* [vue](https://cn.vuejs.org/v2/guide/)：不多解释，vue大法好
* [electron-vue](https://github.com/SimulatedGREG/electron-vue)：基于vue-cli扩展的electron与vue结合的脚手架
* [iview](https://www.iviewui.com/docs/guide/install)：UI框架

## 开始之前

* 确定自己的机器已经安装了yarn，如果没有，就brew安装下吧，很快~
* 确定yarn已经配置了淘宝镜像，因为electron比较大，国外镜像很慢很慢很慢，设置方法：

```bash
yarn config set registry https://registry.npm.taobao.org
```

## 开始安装

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:9080
yarn run dev

```

## Tips

* VsCode 中eslint 不好使，autofix影响很大？

  (1).vscode 插件安装，`Vetur`

  (2).vscode 中配置添加:

  ```javascript
  "eslint.autoFixOnSave": true,
  "eslint.validate": [
    "javascript",{
      "language": "vue",
      "autoFix": true
    },
    "html",
    "vue"
  ],
  ```

* vetur 在template中引用ivew会导致template误报红线？

  继续增加配置：`"vetur.validation.template": false,`

---
