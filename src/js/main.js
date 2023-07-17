import {
  Options,
} from './modules/options.js';

import {
  iosVhFix,
  initSlider
} from './modules/utils.js';

import {
  initModal
} from './modules/modal.js';

import {
  initScrollTop
} from './modules/scroll-top.js';

import {
  validateForms
} from './modules/validate.js';

document.addEventListener( 'DOMContentLoaded', () => {
  iosVhFix();
  window.addEventListener( 'load', () => {
    initModal();
    initSlider( '.class', Options.Swiper.Name );
    initScrollTop();
    validateForms();
  } );
} );
