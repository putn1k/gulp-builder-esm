const sendFormData = ( form ) => {
  const formData = new FormData( form );
  fetch( 'mail.php', {
    method: 'POST',
    body: formData
  } ).then( ( data ) => {
    if ( data.ok ) {
      // do something
    }
  } ).catch( () => {
    // do something
  } );
};

export const runFormHandler = ( evt ) => {
  sendFormData( evt.target );
  evt.target.reset();
};
