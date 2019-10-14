const { override, fixBabelImports, addLessLoader, addBabelPlugin, addBabelPreset, useBabelRc, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            // '@primary-color': '#1DA57A'
        }
    }),
    addWebpackAlias({
        '@': path.join(__dirname, '.', 'src')
    }),
    addBabelPlugin([
        '@babel/plugin-syntax-dynamic-import'
    ]),
    addBabelPreset([
        '@babel/preset-react'
    ]),
    useBabelRc()
)
