import {
  RequestOptions
} from './constants.js';

import {
  disableSubmitBtn,
  enableSubmitBtn,
} from './utils.js';

export const sendFormData = ( evt ) => {
  disableSubmitBtn( evt.target );
  const formData = new FormData( evt.target );
  fetch( RequestOptions.HandlerURL, {
    method: RequestOptions.MethodPost,
    body: formData
  } ).then( ( data ) => {
    if ( data.ok ) {
      // if send success
      evt.target.reset();
    } else {
      // if send error
    }
  } ).catch( () => {
    // if send error - server error
  } ).finally( () => {
    enableSubmitBtn( evt.target );
  } );
};
