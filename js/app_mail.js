// Variables
const btnEnviar = document.querySelector('#enviar');
const resetBtn = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Event Listeners
eventListeners();
function eventListeners(){
  // Cuando la app arranca
  document.addEventListener('DOMContentLoaded', iniciarApp);

  // campos del formulario
  email.addEventListener('blur', validarFormulario);
  asunto.addEventListener('blur', validarFormulario);
  mensaje.addEventListener('blur', validarFormulario);

  // Reinicia el formulario
  resetBtn.addEventListener('click', resetearFormulario);

  // Enviar email
  formulario.addEventListener('submit', enviarEmail);
}


// Funciones
function iniciarApp(){
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}


// Valida el Formulario
function validarFormulario(e){

  const er =  	
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(e.target.value.length > 0){
    // Eliminar los errores
    const error = document.querySelector('p.error');
    if(error){
      error.remove();
    }    

    e.target.classList.remove('border', 'border-red-500');
    e.target.classList.add('border', 'border-green-500');
  }else{
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');
    mostrarError('Todos los campos son obligatorios.');
  }

  if(e.target.type === 'email'){

    // indexOf nos devuelve la posición del arroba en el string. Si devuelve -1, quiere decir que no encontró arroba, por lo tanto no es una dirección de correo válida
    // const resultado = e.target.value.indexOf('@');
    // if(resultado < 0){
    //   mostrarError('No es una dirección de correo válida.');
    // }

    // Para validar correos electrónicos lo mejor y mas profesional es utilizar expresiones regulares
    if(er.test(e.target.value)){
      // Eliminar los errores
      const error = document.querySelector('p.error');
      if(error){
        error.remove();
      }

      e.target.classList.remove('border', 'border-red-500');
      e.target.classList.add('border', 'border-green-500');
    }else{
      e.target.classList.remove('border', 'border-green-500');
      e.target.classList.add('border', 'border-red-500');
      mostrarError('No es una dirección de correo válida.');
    }
  }

  // Fijate que la comprobación del email la hago con la expresión regular
  if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
  }
}

function mostrarError(mensaje){
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('border', 'border-red-500', 'bg-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

  // Aqui vamos a verificar para que los mensajes de error no se repitan cuando entre y salga de los inputs
  const errores = document.querySelectorAll('.error');
  if(errores.length === 0){
    // formulario.insertBefore(mensajeError, document.querySelector('.mb-10'));
    formulario.appendChild(mensajeError);
  }  
}

// Envía el email
function enviarEmail(e){
  e.preventDefault();

  // Mostrar el spinner
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';

  // Después de 3s ocultar el spinner y mostrar el mensaje
  setTimeout( () => {
    spinner.style.display = 'none';

    // Mensaje de enviado correctamente
    const parrafo = document.createElement('p');
    parrafo.textContent = 'El mensaje se envió correctamente';
    parrafo.classList.add('border', 'text-center', 'my-10', 'p-2', 'bg-green-100', 'border-green-500', 'text-green-500');

    // Inserta el párrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);

    // Hacer desaparecer el mensaje después de 5s
    setTimeout(() => {
      parrafo.remove();
      resetearFormulario();
      iniciarApp();
    }, 5000);
  }, 3000);

  // setInterval(() => {
  //   console.log('Esta función se ejecuta cada 3 segundos');
  // }, 3000);
}

// Función que resetea el formulario
function resetearFormulario(){
  formulario.reset();
}