import gulp from 'gulp';

const {
  src,
  dest
} = gulp;
const copyAssets = () => {
  return src( './src/assets/**' )
    .pipe( dest( './build/' ) )
}

export default copyAssets;