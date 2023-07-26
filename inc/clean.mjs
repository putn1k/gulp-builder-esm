import {
  deleteAsync
} from 'del';

const cleanBuildFolder = () => deleteAsync( [ './build/*' ] );

export default cleanBuildFolder;