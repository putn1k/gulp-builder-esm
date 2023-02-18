import {
  Options,
} from './options.js';

const initSlider = ( selector, options ) => {
  if ( !document.querySelector( selector ) ) return;
  return new Swiper( document.querySelector( selector ), options );
};

initSlider( '.class', Options.Swiper.Name );
