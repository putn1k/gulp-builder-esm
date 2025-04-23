import Swiper from 'swiper';
import {
  Navigation
} from 'swiper/modules';
import {
  sliderConfig
} from './configs.js';

const debounce = ( cb, delay ) => {
  let timer;
  return function( ...args ) {
    clearTimeout( timer );
    timer = setTimeout( () => {
      cb.apply( this, args );
    }, delay );
  };
};

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

const lockScroll = () => {
  if ( !document.documentElement.classList.contains( 'is-lock-scroll' ) ) {
    const offset = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.setProperty( '--page-offset-right', `${offset}px` );
    document.documentElement.classList.add( 'is-lock-scroll' );
  }
};

const unlockScroll = () => {
  document.documentElement.style.setProperty( '--page-offset-right', '' );
  document.documentElement.classList.remove( 'is-lock-scroll' );
};

const isEscKey = ( evt ) => evt.key === 'Escape';

const initModal = ( name, handler = 'data-hystmodal' ) => {
  name.config.linkAttributeName = handler;
  name.init();
};

const initSlider = ( name, options = {} ) => {
  const defaultConfig = Object.assign( {}, {
    modules: [ Navigation ],
  }, sliderConfig.default );
  const customConfig = Object.assign( defaultConfig, options );

  if ( typeof name === 'string' ) {
    const sliderElement = document.querySelector( name );

    if ( !sliderElement ) return;
    return new Swiper( sliderElement, customConfig );
  }

  return new Swiper( name, customConfig );
};

const disableSubmitBtn = ( form ) => {
  if ( !form.querySelector( '[type="submit"]' ) ) return;
  form.querySelector( '[type="submit"]' ).setAttribute( 'disabled', 'disabled' );
};

const enableSubmitBtn = ( form ) => {
  if ( !form.querySelector( '[type="submit"]' ) ) return;
  form.querySelector( '[type="submit"]' ).removeAttribute( 'disabled' );
};

const sendData = ( evt, url, isOk, isError ) => {
  const errorNode = evt.target;
  const formData = new FormData( evt.target );

  disableSubmitBtn( evt.target );
  fetch( url, {
      method: 'POST',
      body: formData,
    } )
    .then( ( data ) => {
      if ( data.ok ) {
        isOk( evt.target );
        evt.target.reset();
      } else {
        isError( errorNode );
      }
    } )
    .catch( () => {
      isError( errorNode );
    } )
    .finally( () => {
      enableSubmitBtn( evt.target );
    } );
};

export {
  debounce,
  iosVhFix,
  isEscKey,
  lockScroll,
  unlockScroll,
  initSlider,
  initModal,
  sendData
};