import gulp from 'gulp';

const {
  src,
  dest,
} = gulp;

const compileJS = () => {
  return src( './src/js/**/*.js' )
    .pipe( dest( './build/js/' ) );
};

export default compileJS;