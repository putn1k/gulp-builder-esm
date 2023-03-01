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

const iosChecker = () => {
  return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes( navigator.platform )
    // iPad on iOS 13 detection
    ||
    ( navigator.userAgent.includes( 'Mac' ) && 'ontouchend' in document );
};

const iosVhFix = () => {
  if ( !( !!window.MSInputMethodContext && !!document.documentMode ) ) {
    if ( iosChecker() ) {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty( '--vh', `${vh}px` );

      window.addEventListener( 'resize', function() {
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty( '--vh', `${vh}px` );
      } );
    }
  }
};

const initSlider = ( selector, options ) => {
  if ( !document.querySelector( selector ) ) return;
  return new Swiper( document.querySelector( selector ), options );
};

export {
  debounce,
  throttle,
  disableSubmitBtn,
  enableSubmitBtn,
  isEscKey,
  addLeadZero,
  iosVhFix,
  initSlider
};
