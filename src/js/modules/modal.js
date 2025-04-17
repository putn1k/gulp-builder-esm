import {
  modalConfig,
} from './configs.js';

import {
  initModal,
} from './utils.js';

const beforeOpenCb = ( modal ) => {
  switch ( modal.openedWindow.id ) {
    default:
      return;
  }
};

const simpleModal = new HystModal( Object.assign( modalConfig, {
  beforeOpen: beforeOpenCb,
} ) );

const initModals = () => {
  initModal( simpleModal );
};

export {
  simpleModal,
  initModals,
};