
import mainJSConfig from './webpack-configs/mainJS'
import configs, { entries } from './webpack-configs/configs'
import distCJS from './webpack-configs/dist.commonjs2'
import distWEB from './webpack-configs/dist.web'

let webpackConfig = [];

if( entries.length > 0 ){
    webpackConfig = [
        mainJSConfig,
        configs
    ]
} else {
    webpackConfig = mainJSConfig
}

if (process.env.NODE_ENV ){
    webpackConfig.push( distCJS )
    webpackConfig.push( distWEB )
}

export default webpackConfig;
