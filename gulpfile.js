import gulp from 'gulp';
import del from 'del';
import concat from 'gulp-concat';
import gulpIf from 'gulp-if';
import notify from 'gulp-notify';
import bs from 'browser-sync';
import fileInclude from 'gulp-file-include';
import beautifyHTML from 'gulp-html-beautify';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cleanCSS from 'gulp-clean-css';
import csscomb from "gulp-csscomb";
import squoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';

const {
  src,
  dest,
  series,
  parallel,
  watch
} = gulp;
const sass = gulpSass( dartSass );
const browserSync = bs.create();
const Path = {
  Src: './src/',
  Build: './build/',
  HTML: 'html/',
  Style: 'style/',
  JS: 'js/',
  Img: 'img/',
  Vendor: 'vendor/',
  Assets: 'assets/'
};
const RASTER_FILES = [
  `${Path.Src}${Path.Img}**/*.jpg`,
  `${Path.Src}${Path.Img}**/*.jpeg`,
  `${Path.Src}${Path.Img}**/*.png`,
  `${Path.Src}${Path.Img}**/*.webp`
];
const VECTOR_FILES = [
  `${Path.Src}${Path.Img}**/*.svg`,
  `!${Path.Src}${Path.Img}sprite/**.svg`
];
let isProd = false;

const cleanBuildFolder = () => del( [ `${Path.Build}*` ] );

const getHTML = () => {
  return src( [ `${Path.Src}*.html` ] )
    .pipe( fileInclude( {
      prefix: '@',
      basepath: '@file'
    } ).on( "error", notify.onError() ) )
    .pipe( gulpIf( isProd, beautifyHTML( {
      indentSize: 2
    } ) ) )
    .pipe( dest( Path.Build ) )
    .pipe( gulpIf( !isProd, browserSync.stream() ) );
};

const getStyles = () => {
  return src( `${Path.Src}${Path.Style}**/*.scss` )
    .pipe( sass().on( "error", notify.onError() ) )
    .pipe( postcss( [
      autoprefixer( {
        cascade: false,
      } )
    ] ) )
    .pipe( gulpIf( isProd, csscomb() ) )
    .pipe( dest( `${Path.Build}${Path.Style}` ) )
    .pipe( gulpIf( !isProd, browserSync.stream() ) );
};

const minifyVendorStyles = () => {
  return src( `${Path.Build}${Path.Style}vendor-bundle.css` )
    .pipe( cleanCSS( {
      level: 2
    } ) )
    .pipe( dest( `${Path.Build}${Path.Style}` ) )
};

const getUserScripts = () => {
  return src( `${Path.Src}${Path.JS}**/*.js` )
    .pipe( dest( `${Path.Build}${Path.JS}` ) )
    .pipe( gulpIf( !isProd, browserSync.stream() ) );
}

const getVendorScripts = () => {
  return src( `${Path.Src}${Path.Vendor}**/*.js` )
    .pipe( concat( 'vendor-bundle.js' ) )
    .pipe( dest( `${Path.Build}${Path.JS}` ) )
    .pipe( gulpIf( !isProd, browserSync.stream() ) );
}

const getAssets = () => {
  return src( `${Path.Src}${Path.Assets}/**` )
    .pipe( dest( `${Path.Build}` ) )
}

const getRaster = () => {
  return src( RASTER_FILES )
    .pipe( gulpIf( isProd, squoosh() ) )
    .pipe( dest( `${Path.Build}${Path.Img}` ) )
};

const getVector = () => {
  return src( VECTOR_FILES )
    .pipe( svgmin() )
    .pipe( dest( `${Path.Build}${Path.Img}` ) )
};

const getSprite = () => {
  return src( `${Path.Src}${Path.Img}sprite/**.svg` )
    .pipe( svgmin() )
    .pipe( svgSprite( {
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    } ) )
    .pipe( dest( `${Path.Build}${Path.Img}` ) );
}

const watchFiles = () => {
  browserSync.init( {
    server: {
      baseDir: `${Path.Build}`
    },
    notify: false,
    ui: false,
  } );

  watch( [ `${Path.Src}*.html`, `${Path.Src}${Path.HTML}**/*.html` ], getHTML );
  watch( [ `${Path.Src}${Path.Style}**/*.scss`, `${Path.Src}${Path.Vendor}**/*.css` ], getStyles );
  watch( `${Path.Src}${Path.JS}**/*.js`, getScripts );
  watch( `${Path.Src}${Path.Vendor}**/*.js`, getVendorScripts );
  watch( `${Path.Src}${Path.Assets}**`, getAssets );
  watch( RASTER_FILES, getRaster );
  watch( VECTOR_FILES, getVector );
  watch( `${Path.Src}${Path.Img}sprite/**.svg`, getSprite );
}

const toProd = ( done ) => {
  isProd = true;
  done();
};

const getScripts = series(
  getUserScripts,
  getVendorScripts,
);

const getImages = series(
  getRaster,
  getVector,
  getSprite
);

const processBuild = parallel(
  getHTML,
  getStyles,
  getScripts,
  getImages,
  getAssets
)

const buildDevelopment = series(
  cleanBuildFolder,
  processBuild,
  watchFiles
);

const buildProduction = series(
  toProd,
  cleanBuildFolder,
  processBuild,
  minifyVendorStyles
);

export default buildDevelopment;
export {
  cleanBuildFolder as clean,
  buildProduction as build
};
