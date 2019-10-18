---
title: 前端开发规范
---

# JIM前端架构设计与开发规范

::: tip
本篇中开发规范带有强烈个人色彩，斟酌阅读
:::

## 项目规划
目前JIM的业务范围是为第三方提供IM服务，包括sdk集成，第三方数据接入和JIM独立版。
前端分为3大模块，也是3个子项目，分别处理相关业务。

Portal: JIM的独立版本
Admin: 提供给第三方的系统配置，包括用户导入，角色管理，权限管理，品牌管理等
SDK: 提供给第三方的IM入口，目前考虑以iframe方式集成至目标系统


## 代码结构

``` js
|-- app/
    |-- doc // Vuepress文档服务器
    |-- portal/ // Portal根目录
        |-- src/
            |-- modules // 各个模块的代码
                |-- boarding // 登录、注册入口
                |-- chat // 聊天模块
                |-- contact // 联系人模块
                |-- common // 共用工具类，组件等
                |-- images // 图片
                |-- layout // 排版组件
                |-- store // Vuex
                |-- theme // 公共样式
            |-- App.vue // Vue的根组件
            |-- config.js // 项目配置 待定
            ...
        |-- index.html
        |-- index.js
|-- build // build脚本
|-- isdk // internal sdk，用来处理api call，常量，缓存。相当于ui层的end point
|-- ...
```

## 开发规范
> 开发规范会以一小点一小点总结，后续会归纳整理
1. 嵌套结构数据获取
``` ts
import _get from 'lodash/get'
const fetchAndProcess = async (params) => {
  const response = await api.call(params)

  // 严禁出现此类数据嵌套和获取方式
  const user = response.data.data.list[0]

  // 推荐
  const user = _get(response, 'data.data.list.0')
}
```

2. 组件定义与使用规范
* 严禁使用毫无意义的名称，例如 'list', 'IndexList', 'UserInfo'
* 严禁使用index.vue和main.vue之类的类根组件文件
* 组件文件名使用大驼峰，组件内name要求与文件名一致，方便debug和一致性
* 向外暴露的根组件使用Im作为前缀。
* 不向外暴露的组件且只为某些个别组件服务的子组件，不需要使用Im开头

  例如：
  ```js
  |-- common/
      |-- components/
          |-- selector/
              |-- ImUserSelector.vue // 对外暴露的共用组件
              |-- UserSelectorItem.vue // 不期望外界引入的子组件，服务于ImUserSelector
              |-- UserSelectorSearchBar.vue // 不期望外界引入的子组件，服务于ImUserSelector
  ```
