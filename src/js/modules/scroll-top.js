import {
  smoothScrollConfig,
  observerConfig,
} from './configs.js';

export const initScrollTop = () => {
  const scrollTopNode = document.querySelector( '#scroll-top' );
  const targetNode = document.querySelector( '#site-top' );
  if ( !scrollTopNode || !targetNode ) return;
  new SmoothScroll( 'a[href*="#"]', smoothScrollConfig );
  const cb = ( entries ) => {
    entries.forEach( ( entry ) => {
      if ( !entry.isIntersecting ) {
        scrollTopNode.classList.add( 'scroll-top--show' );
      } else {
        scrollTopNode.classList.remove( 'scroll-top--show' );
      }
    } );
  };
  new IntersectionObserver( cb, observerConfig.scrollTop ).observe( targetNode );
};
