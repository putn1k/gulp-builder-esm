export const Options = {
  SmoothScroll: {
    speed: 900,
    speedAsDuration: true,
    updateURL: false,
  },
  Modal: {
    linkAttributeName: false,
    catchFocus: true,
    closeOnEsc: true,
    backscroll: true,
  },
  Mask: {
    bodyMask: ' (___) ___ __ __',
  },
  ValidationErrors: {
    errorFieldCssClass: 'is-invalid',
    errorLabelStyle: {
      color: 'var(--error)',
      marginTop: '6px',
      fontSize: '12px',
      textAlign: 'left',
    },
  },
  Observer: {
    ScrollTop: {
      rootMargin: '600px',
      threshold: 1,
    },
  },
  RequestOptions: {
    HandlerURL: 'https://jsonplaceholder.typicode.com/posts',
    MethodGet: 'GET',
    MethodPost: 'POST',
  },
  Swiper: {
    Name: {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        prevEl: '.__prev',
        nextEl: '.__next',
      },
      pagination: {
        el: '.__pagination',
        clickable: false,
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    },
  },
};
