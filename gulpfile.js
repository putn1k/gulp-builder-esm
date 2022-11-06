const {
  src,
  dest,
  series,
  watch
} = require( 'gulp' );
const postcss = require( "gulp-postcss" );
const autoprefixer = require( 'autoprefixer' );
const del = require( 'del' );
const browserSync = require( 'browser-sync' ).create();
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const svgSprite = require( 'gulp-svg-sprite' );
const fileInclude = require( 'gulp-file-include' );
const sourcemaps = require( 'gulp-sourcemaps' );
const notify = require( 'gulp-notify' );
const imagemin = require( 'gulp-imagemin' );
const concat = require( 'gulp-concat' );
const csscomb = require( "gulp-csscomb" );
const cleanCSS = require( 'gulp-clean-css' );

const cleanBuildFolder = () => {
  return del( [ 'build/*' ] )
}

const getSprite = () => {
  return src( './src/img/sprite/**.svg' )
    .pipe( svgSprite( {
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    } ) )
    .pipe( dest( './build/img' ) );
}

const getStyles = () => {
  return src( './src/style/**/*.scss' )
    .pipe( sourcemaps.init() )
    .pipe( sass().on( "error", notify.onError() ) )
    .pipe( postcss( [
      autoprefixer( {
        cascade: false,
      } )
    ] ) )
    .pipe( sourcemaps.write( '.' ) )
    .pipe( dest( './build/style/' ) )
    .pipe( csscomb() )
    .pipe( dest( './build/style/' ) )
    .pipe( browserSync.stream() );
};

const getProdStyles = () => {
  return src( './src/style/**/*.scss' )
    .pipe( sass().on( "error", notify.onError() ) )
    .pipe( postcss( [
      autoprefixer( {
        cascade: false,
      } )
    ] ) )
    .pipe( dest( './build/style/' ) )
    .pipe( csscomb() )
    .pipe( dest( './build/style/' ) )
};

const minifyVendorBundle = () => {
  return src( './build/style/vendor-bundle.css' )
    .pipe( cleanCSS( {
      level: 2
    } ) )
    .pipe( dest( './build/style/' ) )
};

const getScripts = () => {
  src( './src/vendor/**/*.js' )
    .pipe( concat( 'vendor-bundle.js' ) )
    .pipe( dest( './build/js/' ) )
  return src( './src/js/**' )
    .pipe( dest( './build/js' ) )
    .pipe( browserSync.stream() );
}

const getAssets = () => {
  return src( './src/assets/**' )
    .pipe( dest( './build' ) )
}

const getImages = () => {
  return src( [
      './src/img/**.jpg',
      './src/img/**.png',
      './src/img/**.jpeg',
      './src/img/**.webp',
      './src/img/svg-folders/**/*.svg',
      './src/img/*.svg',
      './src/img/**/*.jpg',
      './src/img/**/*.png',
      './src/img/**/*.jpeg',
      './src/img/**/*.webp'
    ] )
    .pipe( dest( './build/img' ) )
};

const getProdImages = () => {
  return src( [
      './src/img/**.jpg',
      './src/img/**.png',
      './src/img/**.jpeg',
      './src/img/**.webp',
      './src/img/svg-folders/**/*.svg',
      './src/img/*.svg',
      './src/img/**/*.jpg',
      './src/img/**/*.png',
      './src/img/**/*.jpeg',
      './src/img/**/*.webp'
    ] )
    .pipe( imagemin( [
      imagemin.optipng( {
        optimizationLevel: 3
      } ),
      imagemin.mozjpeg( {
        progressive: true
      } ),
      imagemin.svgo()
    ] ) )
    .pipe( dest( './build/img' ) )
};

const htmlInclude = () => {
  return src( [ './src/*.html' ] )
    .pipe( fileInclude( {
      prefix: '@',
      basepath: '@file'
    } ).on( "error", notify.onError() ) )
    .pipe( dest( './build' ) )
    .pipe( browserSync.stream() );
}

const watchFiles = () => {
  browserSync.init( {
    server: {
      baseDir: "./build"
    },
    notify: false,
    ui: false,
  } );

  watch( './src/*.html', htmlInclude );
  watch( './src/html/**/*.html', htmlInclude );
  watch( './src/assets/**', getAssets );
  watch( './src/vendor/**/*.css', getStyles );
  watch( './src/js/**/*.js', getScripts );
  watch( './src/style/**/*.scss', getStyles );
  watch( './src/vendor/**/*.js', getScripts );
  watch( './src/img/*.{jpg,jpeg,png,svg,webp}', getImages );
  watch( './src/img/**/*.{jpg,jpeg,png,webp}', getImages );
  watch( './src/img/svg-folders/**/*.svg', getImages );
  watch( './src/img/sprite/**.svg', getSprite );
}

exports.default = series( cleanBuildFolder, htmlInclude, getScripts, getStyles, getAssets, getImages, getSprite, watchFiles );

exports.build = series( cleanBuildFolder, htmlInclude, getScripts, getProdStyles, minifyVendorBundle, getAssets, getProdImages, getSprite );

exports.server = series( watchFiles );

exports.clean = series( cleanBuildFolder );
