import 'baguettebox.js/dist/baguetteBox.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import '../style/main.scss';

import {
  initSiteSettings
} from './modules/settings.js';
import {
  initModals
} from './modules/modal.js';
import {
  initSliders
} from './modules/slider.js';
import {
  validateForms
} from './modules/validate.js';

document.addEventListener( 'DOMContentLoaded', () => {
  initSiteSettings();

  window.addEventListener( 'load', () => {
    validateForms();
    initModals();
    initSliders();
  } );
} );