import {
  validateConfig,
  requestsConfig
} from './configs.js';

import {
  sendData,
} from './utils.js';

import {
  simpleModal,
} from './modal.js';

const justValidateConfig = validateConfig.justValidate;

const isSendOk = () => {
  simpleModal.open( '#send-ok-modal' );
};

const isSendError = ( target ) => {
  target.classList.add( justValidateConfig.errorFormClass );
  setTimeout( () => {
    target.classList.remove( justValidateConfig.errorFormClass );
  }, validateConfig.errorTimeout );
};

export const validateForms = () => {
  const forms = document.querySelectorAll( 'form[data-validate]' );

  if ( forms.length < 1 ) return;

  forms.forEach( ( form ) => {
    const formID = `#${form.id}`;
    const validationRules = new JustValidate( formID, justValidateConfig );
    const requiredFields = document.querySelectorAll( `${formID} [required]` );
    new JustPhoneMask( validateConfig.mask );

    requiredFields.forEach( ( input ) => {
      switch ( input.dataset.validate ) {
        case 'name':
          validationRules.addField( `${formID} [data-validate="name"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: 'Поле обязательно для заполнения'
          }, ] );
          break;
        case 'email':
          validationRules.addField( `${formID} [data-validate="email"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения'
            },
            {
              rule: 'email',
              errorMessage: 'Некорректный адрес электронной почты',
            },
          ] );
          break;
        case 'phone':
          validationRules.addField( `${formID} [data-validate="phone"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения',
            },
            {
              rule: 'minLength',
              value: document.querySelector( `${formID} [data-validate="phone"]` ).dataset.mask.length,
              errorMessage: 'Введите телефон в формате +7 (---) --- -- --',
            },
          ] );
          break;
        case 'message':
          validationRules.addField( `${formID} [data-validate="message"]`, [ {
              rule: 'required',
              value: true,
              errorMessage: 'Поле обязательно для заполнения',
            },
            {
              rule: 'minLength',
              value: 10,
              errorMessage: 'Слишком короткое сообщение',
            },
            {
              rule: 'maxLength',
              value: 200,
              errorMessage: 'Длина сообщения превышает 200 символов',
            },
          ] );
          break;
        case 'confirm':
          validationRules.addField( `${formID} [data-validate="confirm"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: 'Подтвердите согласие на обработку персональных данных',
          }, ] );
          break;
      }
    } );
    validationRules.onSuccess( ( evt ) => {
      sendData( evt, requestsConfig.handlerURL, isSendOk, isSendError );
    } );
  } );
};
