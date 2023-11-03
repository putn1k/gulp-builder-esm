import {
  sliderConfig
} from './configs.js';

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

const disableSubmitBtn = ( form ) => {
  if ( !form.querySelector( '[type="submit"]' ) ) return;
  form.querySelector( '[type="submit"]' ).setAttribute( 'disabled', 'disabled' );
};

const enableSubmitBtn = ( form ) => {
  if ( !form.querySelector( '[type="submit"]' ) ) return;
  form.querySelector( '[type="submit"]' ).removeAttribute( 'disabled' );
};

const isEscKey = ( evt ) => evt.key === 'Escape';

const initModal = ( name, handler = 'data-hystmodal' ) => {
  name.config.linkAttributeName = handler;
  name.init();
};

const initSlider = ( name, options = {}, isSelector = true ) => {
  const defaultConfig = Object.assign( {}, sliderConfig.default );
  const customConfig = Object.assign( defaultConfig, options );

  if ( isSelector ) {
    if ( !document.querySelector( name ) ) return;
    return new Swiper( document.querySelector( name ), customConfig );
  } else {
    return new Swiper( name, customConfig );
  }
};

const isOpenModal = () => document.documentElement.classList.contains( 'hystmodal__opened' );

const sendData = ( evt, url, isOk, isError ) => {
  const errorNode = isOpenModal() ?
    evt.target.closest( '.hystmodal__window' ) :
    evt.target;

  disableSubmitBtn( evt.target );
  fetch( url, {
      method: 'POST',
      body: new FormData( evt.target )
    } )
    .then( ( data ) => {
      if ( data.ok ) {
        isOk();
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
  iosVhFix,
  isEscKey,
  initSlider,
  sendData,
  initModal,
};
