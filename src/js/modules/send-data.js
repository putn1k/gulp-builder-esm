import {
  Options,
} from './options.js';

import {
  disableSubmitBtn,
  enableSubmitBtn,
} from './utils.js';

import {
  simpleModal,
} from './modal.js';

export const sendData = ( evt ) => {
  disableSubmitBtn( evt.target );
  fetch( Options.RequestOptions.HandlerURL, {
      method: Options.RequestOptions.MethodPost,
      body: new FormData( evt.target )
    } )
    .then( ( data ) => {
      if ( data.ok ) {
        simpleModal.open( '#send-ok-modal' );
        evt.target.reset();
      } else {
        simpleModal.open( '#send-error-modal' );
      }
    } )
    .catch( () => {
      simpleModal.open( '#send-error-modal' );
    } )
    .finally( () => {
      enableSubmitBtn( evt.target );
    } );
};
