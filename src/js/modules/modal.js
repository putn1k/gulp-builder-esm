import {
  modalConfig,
} from './configs.js';

import {
  initModal,
} from './utils.js';

const simpleModal = new HystModal( modalConfig );

const initModals = () => {
  initModal( simpleModal );
};

export {
  simpleModal,
  initModals,
};
