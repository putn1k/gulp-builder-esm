import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import concat from 'gulp-concat';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
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
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    postcssPresetEnv()
                  ]
                }
              }
            }
          ]
        }
      ],
    },
    plugins: [
      new CircularDependencyPlugin(),
      new MiniCssExtractPlugin( {
        filename: 'vendor.css'
      } )
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



const compileJS = series(
  processVendorJS,
  processUserJS,
);

export default compileJS;