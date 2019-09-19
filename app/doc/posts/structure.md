# 项目架构设计

本Repo将采取Monorepo的形式管理各个子项目的依赖与发布。

目前在建系统有：Portal, Admin, SDK

## 系统说明

### Portal
Portal可作为standalone提供给用户使用，包含IM的所有功能

## Admin
提供给客户配置Portal的系统，包含基本权限管理，角色管理，Branding配置。

## SDK
客户面向的End Point。用于加载本IM作为插件至目标系统。