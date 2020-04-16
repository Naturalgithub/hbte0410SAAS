const path = require('path')
module.exports = {
  // 这是devServer, 配置自动打开浏览器
  devServer: {
    open: true,
    port: 7776
    // 配置代理
    // 只要请求的路径中包含 /aaa, 那么这个请求将被代理
    // 请求的路径:  /aaa/login   =>  会被代理成  http://localhost:8888/api/private/v1/aaa/login
    // 默认会在路径中额外加上 /aaa, 不要的, 需要配置 pathRewrite, 可以将 /aaa去掉
    // 请求的路径:  /aaa/login   =>  会被代理成  http://localhost:8888/api/private/v1/login
    // proxy: {
    //   '/aaa': {
    //     // 代理的目标路径
    //     target: 'http://localhost:8888/api/private/v1/',
    //     pathRewrite: { '^/aaa': '' }
    //   }
    // }
  },
  publicPath: './',
  // 配置cdn加速的优化
  configureWebpack: {
    // 配置打包的排除项, 从外部引入
    // import Vue from 'vue'  默认会从 node_modules 中导入 vue 使用
    // 只要配置了排除项, 表示将来 vue 使用的的外部的 Vue (script导入了)
    externals: {
      // 表示使用的是全局变量的 Vue
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT'
    },
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'service': '@/service'
        // 'vuex': '@/vuex/index'
      }
    }
  },
  pages: {
    indexx: {
      entry: './src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        // 修改它的选项...
        return options
      })
  }

}
