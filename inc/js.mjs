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
const isProd = process.env.NODE_ENV === 'production';

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

const processUserJS = () => {
  return src( './src/js/**/*.js' )
    .pipe( isProd ? processWebpack() : processBypass() )
    .pipe( dest( './build/assets/' ) );
};

const processVendorJS = () => {
  return src( './src/vendor/**/*.js' )
    .pipe( concat( 'vendor.js' ) )
    .pipe( dest( './build/assets/' ) );
};

const concatJS = () => {
  return src( [ './build/assets/vendor.js', './build/assets/main.js' ] )
    .pipe( concat( 'main.js' ) )
    .pipe( dest( './build/assets/' ) );
};

const delVendorJS = () => deleteAsync( [ './build/assets/vendor.js' ] );

const compileDevJS = series(
  processVendorJS,
  processUserJS
)

const compileProdJS = series(
  compileDevJS,
  concatJS,
  delVendorJS
)

const compileJS = isProd ? compileProdJS : compileDevJS;

export default compileJS;