import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import concat from 'gulp-concat';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import {
  deleteAsync
} from 'del';

const {
  src,
  dest,
  series
} = gulp;

const processWebpack = () => {
  return webpackStream( {
    mode: ( process.env.NODE_ENV === 'production' ) ? 'production' : 'development',
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

const processUserJS = () => {
  return src( './src/js/**/*.js' )
    .pipe( processWebpack() )
    .pipe( dest( './build/assets/' ) );
};

const processVendorJS = () => {
  return src( './src/vendor/**/*.js' )
    .pipe( concat( 'vendor.js' ) )
    .pipe( dest( './build/assets/' ) );
};

const concatJS = () => {
  return src( [ './build/assets/vendor.js', './build/assets/main.js' ] )
    .pipe( concat( 'main.js', {
      newLine: '\n' + '/*User JS*/' + '\n'
    } ) )
    .pipe( dest( './build/assets/' ) );
};

const delVendorJS = () => deleteAsync( [ './build/assets/vendor.js' ] );

const compileJS = series(
  processVendorJS,
  processUserJS,
  concatJS,
  delVendorJS
);

export default compileJS;