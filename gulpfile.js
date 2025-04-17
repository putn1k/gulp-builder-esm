import gulp from 'gulp';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import cleanBuildFolder from './inc/clean.mjs';
import copyAssets from './inc/assets.mjs';
import compileHTML from './inc/html.mjs';
import compileStaticHTML from './inc/html-static.mjs';
import compileCSS from './inc/css.mjs';
import compileJS from './inc/js.mjs';
import {
  copyRasterGraphics,
  copyVectorGraphics,
  compileSprite,
} from './inc/images.mjs';
import {
  deleteAsync
} from 'del';

const {
  src,
  dest,
  series,
  parallel,
  watch
} = gulp;

const BS_SERVER = browserSync.create();

const refreshServer = ( done ) => {
  BS_SERVER.reload();
  done();
};
const streamServer = () => compileCSS().pipe( BS_SERVER.stream() );

const syncServer = () => {
  BS_SERVER.init( {
    server: {
      baseDir: './build/'
    },
    notify: false,
    ui: false,
  } );
  watch( './src/vendor/', series( compileCSS, compileJS, refreshServer ) );
  watch( [ './src/*.html', './src/html/**/*.html' ], series( compileHTML, refreshServer ) );
  watch( './src/js/**/*.js', series( compileJS, refreshServer ) );
  watch( './src/style/**/*.scss', series( compileCSS, streamServer ) );
  watch( './src/assets/', series( copyAssets, refreshServer ) );
  watch( [ './src/img/**/**.{jpg,jpeg,png,gif,webp}' ], series( copyRasterGraphics, refreshServer ) );
  watch( [ './src/img/**/**.svg', '!./src/img/sprite/**.svg' ], series( copyVectorGraphics, refreshServer ) );
  watch( './src/img/sprite/**.svg', series( compileSprite, refreshServer ) );
};

const concatCSS = () => {
  return src( [ './build/assets/vendor.css', './build/assets/main.css' ] )
    .pipe( concat( 'main.css' ) )
    .pipe( dest( './build/assets/' ) );
};

const concatJS = () => {
  return src( [ './build/assets/vendor.js', './build/assets/main.js' ] )
    .pipe( concat( 'main.js', {
      newLine: '\n' + '/*User JS*/' + '\n'
    } ) )
    .pipe( dest( './build/assets/' ) );
};

const delVendorCSS = () => deleteAsync( [ './build/assets/vendor.css' ] );
const delVendorJS = () => deleteAsync( [ './build/assets/vendor.js' ] );

const processConcateVendor = parallel( concatCSS, concatJS );
const processDeleteVendor = parallel( delVendorCSS, delVendorJS );
const processVendor = series( processConcateVendor, processDeleteVendor );

const processBuild = parallel(
  copyAssets,
  compileHTML,
  compileCSS,
  compileJS,
  copyRasterGraphics,
  copyVectorGraphics,
  compileSprite,
);

const processStaticBuild = parallel(
  copyAssets,
  compileStaticHTML,
  compileCSS,
  compileJS,
  copyRasterGraphics,
  copyVectorGraphics,
  compileSprite,
);

const processDevelopment = series( cleanBuildFolder, processBuild, processVendor, syncServer );
const runBuild = series( cleanBuildFolder, processBuild, processVendor );
const runStaticBuild = series( cleanBuildFolder, processStaticBuild, processVendor );

export default processDevelopment;
export {
  cleanBuildFolder as clean,
  runBuild as build,
  runStaticBuild as static,
};