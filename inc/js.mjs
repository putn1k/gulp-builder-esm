import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';

const {
  src,
  dest,
} = gulp;
const isProd = ( process.env.NODE_ENV === 'production' ) || ( process.env.NODE_ENV === 'minify' );
const processWebpack = () => {
  return webpackStream( {
    mode: 'production',
    output: {
      filename: 'main.js',
    },
    devtool: false,
    module: {
      rules: [ {
        test: /\.m?js$/,
        exclude: [ /node_modules/, /vendor/ ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          },
        },
      } ],
    },
    plugins: [
      new DuplicatePackageCheckerPlugin(),
      new CircularDependencyPlugin()
    ],
  } )
};
const processBypass = () => src( './src/js/**/*.js' );

const compileJS = () => {
  return src( './src/js/**/*.js' )
    .pipe( isProd ? processWebpack() : processBypass() )
    .pipe( dest( './build/js/' ) );
};

export default compileJS;