// 具体打包内容自定义
module.exports = {
    // index.html 加入的 js 文件名称，如需打包成多个文件需要再定义一个元素
    vendors: [
        'react',
        'react-dom',
        'react-router',
        'react-router-dom',
        'react-copy-to-clipboard',
        'react-intl',
        'mobx',
        'mobx-react',
        'moment',
        'slash2',
        'lodash',
        'lodash-decorators',
    ]
};