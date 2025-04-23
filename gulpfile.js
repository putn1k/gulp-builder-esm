import gulp from 'gulp';
import browserSync from 'browser-sync';
import cleanBuildFolder from './inc/clean.mjs';
import copyAssets from './inc/assets.mjs';
import compileHTML from './inc/html.mjs';
import compileStaticHTML from './inc/html-static.mjs';
import processWebpack from './inc/webpack.mjs';
import {
  copyRasterGraphics,
  copyVectorGraphics,
  compileSprite,
} from './inc/images.mjs';

const {
  series,
  parallel,
  watch
} = gulp;

const BS_SERVER = browserSync.create();

const refreshServer = ( done ) => {
  BS_SERVER.reload();
  done();
};

const syncServer = () => {
  BS_SERVER.init( {
    server: {
      baseDir: './build/'
    },
    notify: false,
    ui: false,
  } );
  watch( './src/vendor/', series( processWebpack, refreshServer ) );
  watch( './src/assets/', series( copyAssets, refreshServer ) );
  watch( [ './src/*.html', './src/html/**/*.html' ], series( compileHTML, refreshServer ) );
  watch( './src/style/**/*.scss', series( processWebpack, refreshServer ) );
  watch( './src/js/**/*.js', series( processWebpack, refreshServer ) );
  watch( [ './src/img/static/**.{jpg,jpeg,png,svg,gif,webp}' ], series( processWebpack, refreshServer ) );
  watch( [ './src/img/**/**.{jpg,jpeg,png,gif,webp}' ], series( copyRasterGraphics, refreshServer ) );
  watch( [ './src/img/**/**.svg', '!./src/img/sprite/**.svg' ], series( copyVectorGraphics, refreshServer ) );
  watch( './src/img/sprite/**.svg', series( compileSprite, refreshServer ) );
};

const processBuild = parallel(
  copyAssets,
  compileHTML,
  processWebpack,
  copyRasterGraphics,
  copyVectorGraphics,
  compileSprite,
);

const processStaticBuild = parallel(
  copyAssets,
  compileStaticHTML,
  processWebpack,
  copyRasterGraphics,
  copyVectorGraphics,
  compileSprite,
);

const processDevelopment = series( cleanBuildFolder, processBuild, syncServer );
const runBuild = series( cleanBuildFolder, processBuild );
const runStaticBuild = series( cleanBuildFolder, processStaticBuild );

export default processDevelopment;
export {
  cleanBuildFolder as clean,
  runBuild as build,
  runStaticBuild as static,
};