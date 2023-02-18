const debounce = ( cb, delay ) => {
  let timer;

  return function( ...args ) {
    clearTimeout( timer );
    timer = setTimeout( () => {
      cb.apply( this, args );
    }, delay );
  };
};

const throttle = ( cb, delay ) => {
  let isWaiting = false;
  let savedThis = null;
  let savedArgs = null;

  return function wrapper( ...args ) {
    if ( isWaiting ) {
      savedThis = this;
      savedArgs = args;
      return;
    }

    cb.apply( this, args );
    isWaiting = true;
    setTimeout( () => {
      isWaiting = false;
      if ( savedThis ) {
        wrapper.apply( savedThis, savedArgs );
        savedThis = null;
        savedArgs = null;
      }
    }, delay );
  };
};

const disableSubmitBtn = ( form ) => {
  form.querySelector( '[type="submit"]' ).setAttribute( 'disabled', 'disabled' );
};

const enableSubmitBtn = ( form ) => {
  form.querySelector( '[type="submit"]' ).removeAttribute( 'disabled' );
};

const isEscKey = ( evt ) => evt.key === 'Escape';

const addLeadZero = ( number ) => ( number < 10 ) ? `0${number}` : number;

export {
  debounce,
  throttle,
  disableSubmitBtn,
  enableSubmitBtn,
  isEscKey,
  addLeadZero,
};
