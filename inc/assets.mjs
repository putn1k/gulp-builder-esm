import gulp from 'gulp';

const {
  src,
  dest
} = gulp;
const copyAssets = () => {
  return src( [ './src/assets/**', '!./src/assets/fonts', '!./src/assets/fonts/**' ] )
    .pipe( dest( './build/' ) )
}

export default copyAssets;