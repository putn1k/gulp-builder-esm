import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';

const {
  src,
  dest,
} = gulp;
const isProd = process.env.NODE_ENV === 'production';
const compileJS = () => {
  return src( './src/js/main.js' )
    .pipe( webpackStream( {
      mode: isProd ? 'production' : 'development',
      output: {
        filename: 'main.js',
      },
      devtool: !isProd ? 'source-map' : false,
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
    } ) )
    .pipe( dest( './build/js/' ) );
};

export default compileJS;