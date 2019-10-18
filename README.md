# JIM (WIP)


## instruction
本项目要求使用Yarn做为包管理器。使用Learn配合Yarn的workspace进行依赖管理。
1. 安装[yarn](https://yarn.bootcss.com/docs/install/#windows-stable)
2. 执行```yarn```安装依赖


## Document Server
目前Vuepress必须单独安装在app/doc文件夹内，因为core-js3与目前版本的Vuepress不兼容。
使用文档服务器，需要cd到app/doc内，进行Npm install，再在根目录执行npm run dev:docs

