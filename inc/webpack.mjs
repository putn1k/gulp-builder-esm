import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import concat from 'gulp-concat';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import postcssPresetEnv from 'postcss-preset-env';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import {
  deleteAsync
} from 'del';

const {
  src,
  dest,
  series
} = gulp;

const runWebpack = () => {
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
          test: /\.(scss|css)$/,
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
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(woff2?|ttf|eot|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: './fonts/[name][ext][query]'
          }
        },
        {
          test: /\.(png|jpe?g|svg|gif|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: './img/[name][ext][query]'
          }
        }
      ],
    },
    plugins: [
      new CircularDependencyPlugin(),
      new MiniCssExtractPlugin( {
        filename: 'main.css'
      } )
    ],
    optimization: {
      minimizer: [
        new TerserPlugin(),
        new ImageMinimizerPlugin( {
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                [ 'gifsicle', {
                  interlaced: true
                } ],
                [ 'mozjpeg', {
                  quality: 80
                } ],
                [ 'optipng', {
                  optimizationLevel: 5
                } ],
                [ 'svgo', {
                  plugins: [ {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false
                      }
                    }
                  } ]
                } ],
              ],
            },
          },
        } ),
      ],
    },
  } )
};

const delVendorJS = () => deleteAsync( [ './build/assets/vendor.js' ] );

const concatJS = () => {
  return src( [ './build/assets/vendor.js', './build/assets/main.js' ], {
      allowEmpty: true
    } )
    .pipe( concat( 'main.js' ) )
    .pipe( dest( './build/assets/' ) );
};

const processVendorJS = () => {
  return src( './src/vendor/**/*.js', {
      allowEmpty: true
    } )
    .pipe( concat( 'vendor.js' ) )
    .pipe( dest( './build/assets/' ) );
};

const processUserJS = () => {
  return src( './src/js/**/*.js' )
    .pipe( runWebpack() )
    .pipe( dest( './build/assets/' ) );
};

const processWebpack = series(
  processVendorJS,
  processUserJS,
  concatJS,
  delVendorJS,
);

export default processWebpack;