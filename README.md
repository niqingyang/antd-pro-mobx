# Antd Pro Mobx

一个基于mobx的[Ant Design Pro](https://pro.ant.design/index-cn)，其全部功能基本都移植过来了

## 使用方法

* `npm run start`: 开发
* `npm run build`: 构建打包，可将生成的dist目录的内容交给后端

## 为什么做这个项目？

公司要做前后端分离，最终前端打算用 react + mobx + antd 进行开发，那么自然是想把现成的例子 “Antd Pro” 拿来使用的。
[Antd Pro](https://pro.ant.design/index-cn) 是一个大而全，且高度封装的脚手架，帮开发者做了很多基础工作，
但不免提升了学习成本， 尤其内部依赖了`dva `和`umi`，限制住了开发者的同时也让开发者失去了对 webpack 的绝对控制权。所以
利用了一些工作和业余时间（这段时间没少熬夜）做了这个基于 mobx 的 antd pro，相对于 dva 和 umi 的语法和配置，更喜欢 class based
的 mobx，所以参考 dva 和 umi 的代码，开发了一些库（mobx-react-stores、@acme-top/express-mock-middleware、antd-form-plus等），
方便项目开发，使用者可以直接控制 webpack，更灵活，降低了学习成本，开发者可以快速上手，投入进业务开发。

## 适合哪些人使用？

1. 不喜欢`dva`，更喜欢用基于类的`mobx`做状态管理（如果对 dva 或者 umi 了解则上手更快）。
2. 对`umi`框架不熟悉，更想直接操作 webpack。

## 相比 Antd Pro，做了哪些改动

1. 状态管理从`dva`换成了`mobx`，使用 mobx-react-stores 进行管理
2. 去掉了`umi`，改成了直接操作 webpack
3. mock 改用 @acme-top/express-mock-middleware，但使用方式和语法完全和 antd pro 的一样
4. 去掉了测试相关的东西
5. 国际化使用 react-intl，需要开发者自己注入语言包，可以从 stores 中获取 intl 对象
6. 路由使用 mobx-react-router，可以从 stores 中获取 routing 对象
7. 对 IE9、10、11的兼容使用 react-app-polyfill
8. 路由定义的使用方式和 antd pro 基本一致，但没有像 umi 那样去生成临时文件，而是需要直接使用 import 进行加载 ~ 支持组件的按需加载


> 此项目使用方式基本与 Antd Pro 一致，可以参考[Antd Pro](https://pro.ant.design/index-cn) 项目逐渐迭代回去。

## 最后

公司高层最后决定使用 VUE，痛苦中...
