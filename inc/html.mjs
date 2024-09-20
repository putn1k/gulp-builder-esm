import gulp from 'gulp';
import notify from 'gulp-notify';
import gulpIf from 'gulp-if';
import fileInclude from 'gulp-file-include';
import beautifyHTML from 'gulp-html-beautify';

const {
  src,
  dest
} = gulp;

const isProd = ( process.env.NODE_ENV === 'production' ) || ( process.env.NODE_ENV === 'minify' );

const compileHTML = () => {
  return src( [ './src/*.html', '!./src/head.html', '!./src/footer.html' ] )
    .pipe( fileInclude( {
      prefix: '@',
      basepath: '@file'
    } ).on( 'error', notify.onError() ) )
    .pipe( gulpIf( isProd, beautifyHTML( {
      'indent_size': 2
    } ) ) )
    .pipe( dest( './build/' ) );
};

export default compileHTML;