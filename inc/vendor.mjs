import gulp from 'gulp';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';

const {
  src,
  dest
} = gulp;

const copyVendorScripts = () => {
  return src( './src/vendor/**/*.js' )
    .pipe( concat( 'vendor-bundle.js' ) )
    .pipe( dest( './build/js/' ) );
};

const optimizeVendorStyles = () => {
  return src( './build/style/vendor-bundle.css' )
    .pipe( cleanCSS( {
      level: 2
    } ) )
    .pipe( dest( './build/style/' ) );
};

export {
  copyVendorScripts,
  optimizeVendorStyles,
};