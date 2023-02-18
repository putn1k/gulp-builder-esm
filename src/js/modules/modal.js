import {
  Options,
} from './options.js';

const simpleModal = new HystModal( Options.Modal );

const initModal = ( name = simpleModal, handler = 'data-hystmodal' ) => {
  name.config.linkAttributeName = handler;
  name.init();
};

initModal();

export {
  simpleModal,
};
