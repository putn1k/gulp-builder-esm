import {
  initModal,
} from './utils.js';

const beforeOpenCallback = ( modal ) => {
  switch ( modal.openedWindow.id ) {
    default:
      return;
  }
};
const afterCloseCallback = ( modal ) => {
  switch ( modal.openedWindow.id ) {
    default:
      return;
  }
};
const initModals = () => {
  initModal( 'siteModal', 'data-hystmodal', {
    beforeOpen: beforeOpenCallback,
    afterClose: afterCloseCallback,
  } );
};

export {
  initModals,
};