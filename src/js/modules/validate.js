import JustValidate from 'just-validate';
import JustPhoneMask from 'just-phone-mask';

import {
  validateConfig,
} from './configs.js';

import {
  sendData,
} from './utils.js';

const justValidateConfig = validateConfig.justValidate;

const isSendOk = () => {
  window.hystmodal.siteModal.open( '#send-ok-modal' );
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
        default:
          validationRules.addField( `${formID} [data-validate="${input.dataset.validate}"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: 'Поле обязательно для заполнения'
          }, ] );
          break;
      }
    } );
    validationRules.onSuccess( ( evt ) => {
      sendData( evt, evt.target.action, false, isSendOk, isSendError );
    } );
  } );
};