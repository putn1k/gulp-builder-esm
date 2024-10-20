import gulp from 'gulp';
import notify from 'gulp-notify';
import fileInclude from 'gulp-file-include';
import minHTML from 'gulp-htmlmin';

const {
  src,
  dest
} = gulp;

const compileStaticHTML = () => {
  return src( [ './src/*.html', '!./src/head.html', '!./src/footer.html' ] )
    .pipe( fileInclude( {
      prefix: '@',
      basepath: '@file'
    } ).on( 'error', notify.onError() ) )
    .pipe( minHTML( {
      collapseWhitespace: true
    } ) )
    .pipe( dest( './build/' ) );
};

export default compileStaticHTML;