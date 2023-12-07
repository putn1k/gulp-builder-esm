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

const initSlider = ( name, options = {} ) => {
  const defaultConfig = Object.assign( {}, sliderConfig.default );
  const customConfig = Object.assign( defaultConfig, options );

  if ( typeof name === 'string' ) {
    const sliderElement = document.querySelector( name );

    if ( !sliderElement ) return;
    return new Swiper( sliderElement, customConfig );
  }

  return new Swiper( name, customConfig );
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

const fadeOut = ( elem ) => {
  if ( !elem ) return;

  const FADE_TIMEOUT = 10;
  const FADE_STEP = 0.05;
  let targetNode;

  if ( typeof elem === 'string' ) {
    targetNode = document.querySelector( elem );
  } else {
    targetNode = elem;
  }
  targetNode.style.transition = 'opacity .05s ease';

  const processFade = () => {
    if ( !targetNode.style.opacity ) {
      targetNode.style.opacity = 1;
    }

    if ( targetNode.style.opacity > 0 ) {
      targetNode.style.opacity -= FADE_STEP;
    } else {
      clearInterval( fadeFn );
      targetNode.style.display = 'none';
    }
  };

  const fadeFn = setInterval( processFade, FADE_TIMEOUT );
};

export {
  iosVhFix,
  isEscKey,
  initSlider,
  sendData,
  initModal,
  fadeOut
};
