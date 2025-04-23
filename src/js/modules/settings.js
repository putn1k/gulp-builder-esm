import baguetteBox from 'baguettebox.js';
import SmoothScroll from 'smooth-scroll';

import {
  smoothScrollConfig
} from './configs.js';

import {
  iosVhFix
} from './utils.js';

import {
  initScrollObserver,
} from './scroll-observer.js';

const initSiteSettings = () => {
  iosVhFix();
  initScrollObserver();
  new SmoothScroll( 'a[href*="#"]', smoothScrollConfig );
  new AcceptCookiePopup();
  [ '[data-gallery]' ].map( ( item ) => baguetteBox.run( item ) );
};

export {
  initSiteSettings,
};