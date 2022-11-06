import {
  Options,
} from './options.js';

import {
  runFormHandler,
} from './send-form.js';

new justPhoneMask( {
  bodyMask: ' (___) ___ __ __',
} );

const validateForms = () => {
  const forms = document.querySelectorAll( 'form[data-validate]' );
  if ( forms.length < 1 ) return;
  forms.forEach( ( form ) => {
    const formID = `#${form.id}`;
    const validationRules = new JustValidate( formID, Options.ValidationErrors );
    const requiredFields = document.querySelectorAll( `${formID} [required]` );

    if ( requiredFields.length < 1 ) return;

    requiredFields.forEach( ( input ) => {
      switch ( input.dataset.validate ) {
        case 'text':
          validationRules.addField( `${formID} [data-validate="text"]`, [ {
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
        case 'policy':
          validationRules.addField( `${formID} [data-validate="policy"]`, [ {
            rule: 'required',
            value: true,
            errorMessage: 'Подтвердите согласие с политикой конфидециальности',
          }, ] );
          break;
      }
    } );
    validationRules.onSuccess( ( evt ) => {
      runFormHandler( evt );
    } );
  } );
};

validateForms();
